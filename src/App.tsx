import { FC, useState } from 'react';
import './App.css'

interface Param {
  id: number;
  name: string;
  type?: string;
}

interface ParamValue {
  paramId: number;
  value: string;
}

interface Color {
  name: string;
}

interface Model {
  paramsValue: ParamValue[];
  colors?: Color[];
}

interface Props {
  params: Param[];
  model: Model;
}

const params:Param[] = [
  { id: 1, name: "Назначение" },
  { id: 2, name: "Длина" },
]

const model:Model = {
  paramsValue: [
    { paramId: 1, value: "Повседневное" },
    { paramId: 2, value: "Макси" },
  ] 
}

const ParamEditor:FC<Props> = ({ params, model }) => {
  const [paramsValues, setParamsValues] = useState<ParamValue[]>(model.paramsValue);
  const [modelVisible, setModelVisible] = useState<boolean>(false);

  const getModel = ():Model => {
    console.log(model);
    setModelVisible(true);
    return model;
  }

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>, index:number) => {
    const newValues:ParamValue[] = [...paramsValues];
    newValues[index].value = e.target.value; 
    setParamsValues(newValues);
  }

  return (
    <>
      <div className='param-editor'>
        <div className='params'>
          {
            params.map((param, index) =>
              <div key={ index }>{ param.name }:</div>  
            )
          }
        </div>
        <div className='values'>
          {
            paramsValues.map((paramValue, index) =>
              <input key={ index } className='value-input' 
                value={ paramValue.value } 
                onChange={ (e:React.ChangeEvent<HTMLInputElement>) => handleChange(e, index) }/>  
            )
          }
        </div>
      </div>
      <div className='model'>
        <button className='button' onClick={ getModel }>Получить модель</button>
        {
          modelVisible ?
          <>
            <h2>Структура модели:</h2>
            <div className='struct'>
              <div className='params'>
                {
                  params.map((param, index) =>
                    <div key={ index }>{ param.name }:</div>  
                  )
                }
              </div>
              <div className='values'>
                { 
                  paramsValues.map((paramValue, index) =>
                    <div key={ index }>{ paramValue.value }</div>  
                  )
                }
              </div>
            </div>
          </> : null
        }
    </div>
  </>
  )
}

function App() {
  return (
    <>
      <ParamEditor params={ params } model={ model }/>
    </>
  )
}

export default App
