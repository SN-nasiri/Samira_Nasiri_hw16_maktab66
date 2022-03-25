import { useEffect, useState, useRef, useCallback } from "react";
import Button from "./Button";
import Title from "./Title";

function App() {
  console.log("App is rendering...");
  useEffect(() => console.log("== App rendered =="));

  let [value1, setValue1] = useState()
  let [value2, setValue2] = useState()

  let ref1 = useRef()
  let ref2 = useRef()

  const changeValue1 = useCallback(() => {
    setValue1(ref1.current.value)
    ref1.current.value = ''
  }, [value1]);

  const changeValue2 = useCallback(() => {
    setValue2(ref2.current.value)
    ref2.current.value = ''
  }, [value2]);

  return (
    <div className="App">
      <div className="value-1">
        first value: <Title>{value1}</Title>
        <br />
        change first value:
        <input ref={ref1} />
        <Button onClick={changeValue1}> change </Button>
      </div>
      <div className="value-2">
        second value: <Title>{value2}</Title>
        <br />
        change second value:
        <input ref={ref2}/>
        <Button onClick={changeValue2}> change </Button>
      </div>
    </div>
  );
}

export default App;
