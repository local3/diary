import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router';
import { useMemoStyles } from '../../styles/js/memo'
import { ConvertContext } from '../../store/ConvertProvider'
import { CONVERT_MEMO } from '../../utils/convertActions';
type Props = {
  memoId: number
  toggleModal: () => void
}
const MemoForm: React.FC<Props> = (props: Props) => {
  const { convertDispatch } = useContext(ConvertContext)
  const history = useHistory()
  const memoClasses = useMemoStyles()

  const initMemo = {
    content: ''
  }
  const [memo, setMemo] = useState(initMemo)
  const [isEdit, setIsEdit] = useState(false)

  const initExistMemoEffect = () => {
    axios.get(`/memos/${props.memoId}`)
      .then(res => {
        const existMemo = res.data
        existMemo ? setIsEdit(true) : setIsEdit(false)
        if(existMemo){
          setMemo({
            ...memo,
            content: existMemo.content
          })
        }
      })
  }

  useEffect(initExistMemoEffect, [])
  
  const handleChangeContent = (e) => {
    setMemo({
				...memo,
				content: e.target.value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    isEdit 
      ? axios.patch(`/memos/${props.memoId}`, { memo: memo })
          .then(res => {
            convertDispatch({type: CONVERT_MEMO})
            isEdit ? history.push('/memos') : props.toggleModal()
          })
      : axios.post(`/memos`, { memo: memo })
          .then(res => {
            convertDispatch({type: CONVERT_MEMO})
            isEdit ? history.push('/memos') : props.toggleModal()
          })
  };

  return(
    <>
      <form onSubmit={handleSubmit}>
        <textarea
          name="content"  
          onChange={handleChangeContent}
          value={memo.content}
          className={memoClasses.memoFormTextarea}
        />

        <br/>

        <button type="submit">めも！</button>
      </form>
    </>
  )
}

export default MemoForm;
