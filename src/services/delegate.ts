import { ApiService, ForgingService, WalletService, RoundService, UnikService } from "@/services";
import { roundFromHeight } from "@/utils";
import store from "@/store";
import { IApiDelegateWrapper, IApiDelegatesWrapper, IApiWalletsWrapper, IDelegate, IUnik } from "../interfaces";
import { isUnikId } from "@/utils/unik-utils";
import { DIDType, DIDHelpers } from '@uns/ts-sdk';
import { apiLimit, paginationLimit } from "@/constants";

class DelegateService {
  public async fetchEveryDelegate(): Promise<IDelegate[]> {
    const response = (await ApiService.get("delegates", {
      params: {
        page: 1,
      },
    })) as IApiDelegatesWrapper;

    const requests = [];

    for (let index = 2; index <= response.meta.pageCount; index++) {
      requests.push(
        ApiService.get("delegates", {
          params: {
            page: index,
          },
        }),
      );
    }

    const results = await Promise.all(requests);

    const delegates = response.data.concat([].concat(...results.map(result => result.data)));

    return this.getDelegatesWithUnikAttributes(delegates);
  }

  public async all(page = 1, limit: number = paginationLimit): Promise<IApiDelegatesWrapper> {
    const response = (await ApiService.get("delegates", {
      params: {
        page,
        limit,
      },
    })) as IApiDelegatesWrapper;

    return {
      meta: response.meta,
      data: await this.getDelegatesWithUnikAttributes(response.data),
    };
  }

  public async voters(query: string, page: number, limit = paginationLimit): Promise<IApiWalletsWrapper> {
    const response = (await ApiService.get(`delegates/${query}/voters`, {
      params: {
        page,
        limit,
      },
    })) as IApiWalletsWrapper;

    return response;
  }

  public async voterCount(publicKey: string, excludeLowBalances = true): Promise<number> {
    const response = (await WalletService.search(
      {
        vote: publicKey,
        balance: {
          from: excludeLowBalances ? 1e7 : 0,
        },
      },
      1,
      1,
    )) as IApiWalletsWrapper;

    return response.meta.totalCount;
  }

  public async find(query: string, fetchUnik: boolean = false): Promise<IDelegate> {
    const response = (await ApiService.get(`delegates/${query}`)) as IApiDelegateWrapper;
    let delegate = response.data;
    if (fetchUnik && isUnikId(delegate.username)) {
      delegate = (await this.getDelegatesWithUnikAttributes([delegate]))[0];
    }
    return delegate;
  }

  public async active(delegateType?: DIDType): Promise<IDelegate[]> {
    const activeDelegates = store.getters["network/activeDelegates"];
    const height = store.getters["network/height"];
    const previousDelegates = await RoundService.delegates(roundFromHeight(height) - 1);

    const response = (await ApiService.get("delegates", {
      params: {
        limit: activeDelegates,
      },
    })) as IApiDelegatesWrapper;

    let delegates: IDelegate[] = response.data.map(delegate => {
      delegate.forgingStatus = ForgingService.status(delegate, height, previousDelegates);
      return delegate;
    });

    delegates = await this.getDelegatesWithUnikAttributes(delegates);

    return this.filterDelegatesByType(delegates, delegateType);
  }

  public async standby(delegateType?: DIDType): Promise<IDelegate[]> {
    const activeDelegates = store.getters["network/activeDelegates"];

    const response = (await ApiService.get("delegates", {
      params: {
        offset: activeDelegates,
        limit:
          activeDelegates < paginationLimit
            ? paginationLimit + (paginationLimit - (activeDelegates % paginationLimit))
            : paginationLimit - (activeDelegates % paginationLimit),
      },
    })) as IApiDelegatesWrapper;

    let delegates: IDelegate[] = response.data.filter(delegate => !delegate.isResigned);

    delegates = await this.getDelegatesWithUnikAttributes(delegates);

    return this.filterDelegatesByType(delegates, delegateType);
  }

  private filterDelegatesByType(delegates: IDelegate[], delegateType?: DIDType): IDelegate[] {
    if (delegates.length && delegateType) {
      const delegateTypeCode: number = DIDHelpers.fromLabel(delegateType);
      let newRank = 1;
      delegates = delegates
      .filter(delegate => delegate.unikType ? parseInt(delegate.unikType) === delegateTypeCode : delegateTypeCode === 1)
      .map(delegate => {
        delegate.rank = newRank;
        newRank++;
        return delegate;
      })
    }
    return delegates;
  }

  public async resigned(): Promise<IDelegate[]> {
    const response = await this.allResigned();
    return response.data;
  }

  public async allResigned(page = 1, limit: number = paginationLimit): Promise<IApiDelegatesWrapper> {
    const response = (await ApiService.get("delegates", {
      params: {
        type: "resigned",
        page,
        limit,
      },
    })) as IApiDelegatesWrapper;

    return response;
  }

  public async forged(): Promise<Array<{ delegate: string; forged: number }>> {
    const activeDelegates = store.getters["network/activeDelegates"];

    const response = (await ApiService.get("delegates", {
      params: {
        limit: activeDelegates,
      },
    })) as IApiDelegatesWrapper;

    return response.data.map((delegate, index) => {
      return {
        delegate: delegate.publicKey,
        forged: Number(delegate.forged.total),
      };
    });
  }

  public async activeDelegatesCount(): Promise<number> {
    const response = (await ApiService.get("delegates", {
      params: {
        limit: 1,
      },
    })) as IApiDelegatesWrapper;
    return response.meta.totalCount;
  }

  private async getDelegatesWithUnikAttributes(delegates: IDelegate[]): Promise<IDelegate[]> {
    if (delegates.length) {
      const unikIds = delegates.filter(delegate => isUnikId(delegate.username)).map(delegate => delegate.username);
      if (unikIds.length) {
        const uniks = await UnikService.getUniks(unikIds);
        const uniksInfoMap = uniks.reduce((unikMap, unik) => {
          unikMap[unik.id] = { unikType: unik.type, unikname: unik.defaultExplicitValue };
          return unikMap;
        }, {});

        const results = delegates.map(delegate => {
          if (isUnikId(delegate.username)) {
            Object.assign(delegate, uniksInfoMap[delegate.username]);
          }
          return delegate;
        });
        return results;
      }
    }

    return delegates;
  }
}

export default new DelegateService();
