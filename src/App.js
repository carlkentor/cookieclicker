import { Grid, Card, CookieIncrementer } from "components/ui";

import "./scss/main.scss";
function App() {
  return (
    <>
      <Grid>
        <Card>
          <CookieIncrementer />
        </Card>
        <Card />
      </Grid>
    </>
  );
}

export default App;
