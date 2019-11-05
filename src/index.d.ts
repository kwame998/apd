import * as React from 'react';
export interface IAppDesignerProps {
    height: Number;
    lang: String;
    onChange: Function;
}

export default class AppDesigner extends React.Component<IAppDesignerProps, any> {}
