'use client'

import React, { useEffect, ReactNode } from 'react'
// import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock'

// const BODY_SCROLL_LOCK_OPTIONS = {
//   // スクロールロック時、body にスクロールバー分の padding-right を追加する
//   // スクロールロック時に背面の要素が変に右に移動するといった事象が防げる
//   reserveScrollBarGap: true,
// }

const km = new (class KM {
  private keyList: Array<string>

  constructor() {
    this.keyList = new Array<string>()
  }

  get length(): number {
    return this.keyList.length
  }

  containsKey(key: string): boolean {
    return this.keyList.includes(key)
  }

  addKey(key: string) {
    if (!this.containsKey(key)) {
      this.keyList.push(key)
    }
  }

  removeKey(key: string) {
    this.keyList = this.keyList.filter((_) => _ !== key)
  }
})

type WindowmaskProps = {
  uniqueKey: string
  isShown: boolean
  children: ReactNode
  enableScrollTargetRef: React.RefObject<HTMLDivElement>
  close: Function
}

const Windowmask: React.FC<WindowmaskProps> = ({ uniqueKey, isShown, children, enableScrollTargetRef, close }) => {
  useEffect(() => {
    // if (isShown) {
    //   // 呼び出し登録
    //   km.addKey(uniqueKey)
    //   // スクロールロックを掛ける
    //   disableBodyScroll(enableScrollTargetRef.current as HTMLElement, BODY_SCROLL_LOCK_OPTIONS)
    // } else {
    //   // 呼び出し登録を削除
    //   if (km.containsKey(uniqueKey)) {
    //     km.removeKey(uniqueKey)
    //   }
    //   // 他からの呼び出しがなければスクロールロックを全解除
    //   if (km.length === 0) {
    //     clearAllBodyScrollLocks()
    //   }
    // }
  }, [isShown, enableScrollTargetRef])

  return isShown ? (
    <div className={'fixed top-0 left-0 z-50 w-full h-full bg-black/40'} onClick={() => close()}>
      {children}
    </div>
  ) : null
}
export default Windowmask