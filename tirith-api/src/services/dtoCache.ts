export class DtoCache<TDto, TKey> {

    private cache = new Map<TKey, { dto: TDto, time: number }>();

    constructor(private selector: (dto: TDto) => TKey, private expiryMs: number) { }

    public async getOrFetch(key: TKey, fetch: () => Promise<TDto>): Promise<TDto> {
        const now = Date.now();
        const cached = this.cache.get(key);
        if (cached === undefined || now - cached.time > this.expiryMs) {
            const fetched = await fetch();
            const key = this.selector(fetched);
            this.cache.set(key, { time: Date.now(), dto: fetched });
            return fetched;
        }
        else return cached.dto;
    }
}