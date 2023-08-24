interface StorageData<T = any> {
    data: T
    expire: number | null
}
export function createLocalStorage(options?: { expire?: number | null }) {
    const DEFAULT_CACHE_TIME = 60 * 60 * 24 * 7 //默认缓存时间
  
    const { expire } = Object.assign({ expire: DEFAULT_CACHE_TIME }, options)
    
    // 给localStorage的值进行赋值
    function set<T = any>(key: string, data: T) {
      const storageData: StorageData<T> = {
        data,
        expire: expire !== null ? new Date().getTime() + expire * 1000 : null,
      }
  
      const json = JSON.stringify(storageData)
      window.localStorage.setItem(key, json)
    }
    // 获取localStorage的值
    function get(key: string) {
      //获取json
      const json = window.localStorage.getItem(key)
      if (json) {
        let storageData: StorageData | null = null
  
        try {
          //转译json
          storageData = JSON.parse(json)
        }
        catch {
          // Prevent failure
        }
  
        if (storageData) {
          const { data, expire } = storageData
          if (expire === null || expire >= Date.now())
            return data
        }
  
        remove(key)
        return null
      }
    }
  
    function remove(key: string) {
      window.localStorage.removeItem(key)
    }
  
    function clear() {
      window.localStorage.clear()
    }
  
    return { set, get, remove, clear }
}
export const ls = createLocalStorage()

export const ss = createLocalStorage({ expire: null })
