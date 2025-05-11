import React from 'react';

interface Param {
  id: number;
  name: string;
  type: 'string';
}

interface ParamValue {
  paramId: number;
  value: string;
}

interface Model {
  paramValues: ParamValue[];
}

interface Props {
  params: Param[];
  model: Model;
}

interface State {
  paramValues: { [key: number]: string };
}

class ParamEditor extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const initialValues = this.props.model.paramValues.reduce((acc, paramValue) => {
      acc[paramValue.paramId] = paramValue.value;
      return acc;
    }, {} as { [key: number]: string });

    this.state = {
      paramValues: initialValues,
    };
  }

  public getModel(): Model {
    const { paramValues } = this.state;
    const paramValuesArray = Object.keys(paramValues).map(key => ({
      paramId: Number(key),
      value: paramValues[Number(key)],
    }));

    return {
      paramValues: paramValuesArray,
    };
  }

  private handleChange = (paramId: number, value: string) => {
    this.setState(prevState => ({
      paramValues: {
        ...prevState.paramValues,
        [paramId]: value,
      },
    }));
  };

  render() {
    const { params } = this.props;
    const { paramValues } = this.state;

    return (
      <div>
        {params.map(param => (
          <div key={param.id}>
            <label>{param.name}:</label>
            <input
              type="text"
              value={paramValues[param.id] || ''}
              onChange={(e) => this.handleChange(param.id, e.target.value)}
            />
          </div>
        ))}
      </div>
    );
  }
}

const paramsExample: Param[] = [
  { id: 1, name: "Назначение", type: 'string' },
  { id: 2, name: "Длина", type: 'string' },
  { id: 3, name: "Цвет", type: 'string' },
];

const modelExample: Model = {
  paramValues: [
    { paramId: 1, value: "повседневное" },
    { paramId: 2, value: "макси" },
    { paramId: 3, value: "черный" },
  ]
};


const App = () => (
  <div>
    <ParamEditor params={paramsExample} model={modelExample} />
  </div>
);

export default App;