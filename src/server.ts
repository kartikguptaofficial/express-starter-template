import { ServerConfigs } from './configs/app.config';
import ServerApp from './index'

const serverPort = ServerConfigs.PORT;

ServerApp.listen(serverPort, () => {
    console.log(`Server listening on port ${serverPort}`);
});