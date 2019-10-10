import React, { useContext, useEffect, useMemo, useRef } from 'react';
import EditableTable from 'antd-etable';
import { DataContext } from '../../utils/context';

const TableRenderer = ({widget}) => {
  const { widgets } = useContext(DataContext);
  const { label,pageSize } = widget.detail;
  const loading = false;
  const data = [];
  const changedData = [];
  const total = 100;
  const columns = widgets.filter(d => d.parentId === widget.id && d.type === 'tablecol');
  const cols = useMemo(()=>
    columns.map( column => ({
      title: column.detail.label,
      dataIndex: column.detail.dataAttribute,
      sorter: column.detail.sortable,
      width: column.detail.width,
      editable: true,
    })),[columns]);
  return (
    <EditableTable
      rowKey="id"
      title={label}
      loading={loading}
      data={data}
      changedData={changedData}
      pageSize={pageSize}
      total={total}
      cols={cols}
    />
  )
};

export default TableRenderer;
