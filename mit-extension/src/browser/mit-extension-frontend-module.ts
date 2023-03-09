import { ContainerModule } from "@theia/core/shared/inversify";
import {
    ApplicationShell,
    bindViewContribution,
    FrontendApplicationContribution,
    WidgetFactory,
} from "@theia/core/lib/browser";
import { MitApplicationShell } from "./mit-application-shell";
import { RightPanelContribution } from "./mit-right-panel-contribution";
import { RightPanelWidget } from "./mit-right-panel-widget";
import { ExerciseDescriptionWidget } from "./mit-exercise-description-widget";

export default new ContainerModule((bind, _unbind, _isBound, rebind) => {
    rebind(ApplicationShell).to(MitApplicationShell).inSingletonScope();

    bindViewContribution(bind, RightPanelContribution);
    bind(FrontendApplicationContribution).toService(RightPanelContribution);

    bind(RightPanelWidget).toSelf();
    bind(WidgetFactory)
        .toDynamicValue((ctx) => ({
            id: RightPanelWidget.ID,
            createWidget: () =>
                ctx.container.get<RightPanelWidget>(RightPanelWidget),
        }))
        .inSingletonScope();

    bind(ExerciseDescriptionWidget).toSelf();
    bind(WidgetFactory)
        .toDynamicValue(({ container }) => ({
            id: ExerciseDescriptionWidget.ID,
            createWidget: () => container.get(ExerciseDescriptionWidget),
        }))
        .inSingletonScope();
});
