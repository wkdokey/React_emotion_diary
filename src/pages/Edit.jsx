import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import Button from '../components/Button';
import { useContext, useEffect, useState } from 'react';
import { DiaryDispatchContext, DiaryStateContext } from '../App';
import Editor from '../components/Editor';
import useDiary from '../Hooks/useDiary';
import usePageTitle from '../Hooks/usePageTitle';

const Edit = () => {
    const params = useParams();
    const nav = useNavigate();
    const { onDelete, onUpdate } = useContext(DiaryDispatchContext);
    const curDiaryItem = useDiary(params.id);
    usePageTitle(`${params.id}번 일기 수정`);

    const onClickDelete = () => {
        if (window.confirm('일기를 정말 삭제할까요? 다시 복구되지 않습니다.')) {
            //일기 삭제
            onDelete(params.id);
            nav('/', { replace: true });
        }
    };

    const onSubmit = (input) => {
        if (window.confirm('일기를 정말 수정하시겠습니까?')) {
            onUpdate(params.id, input.createdDate.getTime(), input.emotionId, input.content);
        }
        nav('/', { replace: true });
    };

    return (
        <div>
            <Header
                title={'일기 수정하기'}
                leftChild={<Button onClick={() => nav(-1)} text={'< 뒤로가기'} />}
                rightChild={<Button onClick={onClickDelete} text={'삭제하기'} type={'NEGATIVE'} />}
            />
            <Editor onSubmit={onSubmit} initData={curDiaryItem} />
        </div>
    );
};

export default Edit;
