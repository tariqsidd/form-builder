import {Box} from "@mui/material";
import FormContainer from "./form-builder";
import FormDesigner from "./form-builder/FormDesigner";
const schema = {
  fields: [
    {
      type: "text",
      name: "firstName",
      label: "First Name",
      question:'What is your first name?',
      gridProps: {size:{xs: 12, sm: 6}},
    },
    {
      type: "text",
      name: "lastName",
      label: "Last Name",
      question:'What is your last name?',
      gridProps: {size:{xs: 12, sm: 6}
    },
    },
  ],
};
function App() {
  return (
    <Box sx={{m:4}}>
      <FormDesigner/>
    </Box>
  );
}

export default App;
