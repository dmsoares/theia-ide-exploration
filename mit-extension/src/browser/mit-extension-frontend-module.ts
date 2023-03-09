import { ContainerModule } from "@theia/core/shared/inversify";
import { ApplicationShell } from "@theia/core/lib/browser";
import { MitApplicationShell } from "./mit-application-shell";

export default new ContainerModule((_bind, _unbind, _isBound, rebind) => {
    rebind(ApplicationShell).to(MitApplicationShell).inSingletonScope();
});
