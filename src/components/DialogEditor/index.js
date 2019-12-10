import React, { useMemo, useState, } from 'react';
import DraggableModal from '../DraggableModal';
import { useDispatch, useMappedState } from 'redux-react-hook';
import EditableTable from 'antd-etable'
import _ from 'lodash'


const mapState = state => ({
  widgets: state.widgets.filter(w => w.type === 'dialog'),
});

const DialogEditor = ({visible,onOk,onCancel}) => {
  const { widgets } = useMappedState(mapState);
  const dispatch = useDispatch();
  const [changedData,setChangedData] = useState([]);
  const total = 0;
  const cols = [
    {
      dataIndex: 'dialogId',
      title:'控件标识',
      editable:true,
      render: (text,record) => (
        <a style={{textDecoration:'underline'}} onClick={()=>dispatch({ type: 'updateWidget', payload: { id: record.id, visible:true } })}>{text}</a>
      ),
      editor: {
        required: true,
        validator: (rule,value,callback,record) => {
          if(widgets.find(d => d.dialogId === value) || changedData.find(d => d.dialogId === value))
            callback('控件标识已存在!');
          else if(_.isString(value) && !/^[a-zA-Z][a-zA-Z0-9_]*$/.test(value))
            callback('只能包含字母数字');
          else
            callback();
        },
      },
    },
    {
      dataIndex: 'title',
      title: '标题',
      editable: true,
      editor: {
        required: true,
      }
    }
  ];
  const onFetch = (pager) => {

  };
  const onUpdate = (d) => {
    setChangedData(d);
  };
  return (
    <>
      <DraggableModal visible={visible}
                      width={600}
                      title={"编辑对话框"}
                      showFooter
                      onOk={()=>{
                        onOk(changedData);
                        setChangedData([])
                      }}
                      onCancel={()=>{
                        onCancel();
                        setChangedData([])
                      }}>
        <EditableTable
          rowKey="id"
          loading={false}
          data={widgets}
          changedData={changedData}
          pageSize={5}
          total={total}
          onFetch={onFetch}
          onChangedDataUpdate={onUpdate}
          cols={cols}
        />
      </DraggableModal>
    </>
  );
};

export default DialogEditor;
