import { Grid, Card, CookieIncrementer } from "components/ui";
import { ToolInventory, AllTools } from "components/tools";
import "./scss/main.scss";
function App() {
  return (
    <>
      <Grid>
        <Card>
          <CookieIncrementer />
        </Card>
        <Card>
          <ToolInventory />
        </Card>
        <Card>
          <AllTools />
        </Card>
      </Grid>
    </>
  );
}

export default App;
