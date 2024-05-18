export interface InitDao {
    getInit(): Promise<Partial<Init> | null>
}

export type Init =  {};

