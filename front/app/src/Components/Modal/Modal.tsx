'use client'

import React, { useRef, ReactNode } from 'react'
import Windowmask from './Windowmask'
import DropzoneComponent from '../Dropzone/Dropzone'

type ModalWindowProps = {
  isShown: boolean
  title?: string
  children?: ReactNode
  closeModal: Function
}

const ModalWindow: React.FC<ModalWindowProps> = ({ isShown, title, children, closeModal }) => {
  const enableScrollTargetRef = useRef(React.createRef<HTMLDivElement>()).current

  return (
    <Windowmask isShown={isShown} uniqueKey={'modal-window'} enableScrollTargetRef={enableScrollTargetRef} close={closeModal}>
      {/* Layer */}
      <article className='relative flex justify-center items-center w-full h-full max-h-full p-8'>
        {/* Window */}
        <div
          className='relative flex flex-col w-full max-w-4xl max-h-full overflow-hidden text-gray-400 bg-white rounded-lg shadow'
          onClick={(e) => e.stopPropagation()}
        >
          {/* Window header */}
          <div className='flex items-start justify-between p-4 pr-2 bg-white border-b rounded-t'>
            {/* <h1 className='text-xl font-semibold'>{title}</h1> */}
		      	<DropzoneComponent />
            <button type='button'
              className='inline-flex justify-center items-center ml-auto w-8 h-8 min-w-[2rem] min-h-[2rem] text-sm bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-full'
              onClick={() => closeModal()}
            >✕<span className='sr-only'>Cancel</span></button>
            
          </div>

          {/* Window body */}
          {/* <div className='p-4 overflow-auto' ref={enableScrollTargetRef}>
            {children}
          </div> */}
        </div>
      </article>
    </Windowmask>
  )
}
export default ModalWindow