import { useState } from "react";
import Select from "react-select";
import axios from "axios";
const API_GATEWAY = process.env.REACT_APP_API_HOST;

function EmployeeSelect({ stateChanger, ...rest }) {
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [employee, setEmployee] = useState([]);

  const handleChange = (e) => {
    getEmployee(e);
  };

  const getEmployee = async (e) => {
    const response = await axios.get(`${API_GATEWAY}/employees?name=${e}`);
    const data = await response.data.data;
    const option = data.map((e) => {
      return {
        value: e.id,
        label: `${e.name} - ID${e.id}`,
      };
    });

    setEmployee(option);
  };
  return (
    <>
      <Select
        components={{ DropdownIndicator: false }}
        className="select-font"
        options={employee}
        value={selectedEmployee}
        placeholder="Input Your Name Here . . . "
        onInputChange={(e) => handleChange(e)}
        onChange={(e) => {
          stateChanger(e.value);
          setSelectedEmployee({
            value: e.value,
            label: e.label,
          });
        }}
      />
    </>
  );
}

export default EmployeeSelect;
