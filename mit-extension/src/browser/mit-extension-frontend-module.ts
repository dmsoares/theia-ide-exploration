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
import { TopBarContribution } from "./mit-top-bar-contribution";
import { TopBarWidget } from "./mit-top-bar-widget";
import { BottomBarWidget } from "./mit-bottom-bar-widget";
import { RightSideBarWidget } from "./mit-right-side-bar-widget";
import { LeftSideBarWidget } from "./mit-left-side-bar-widget";
import { ExerciseDescriptionWidget } from "./mit-exercise-description-widget";

import "../../src/browser/style/index.css";

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

    bindViewContribution(bind, TopBarContribution);
    bind(FrontendApplicationContribution).toService(TopBarContribution);

    bind(TopBarWidget).toSelf();
    bind(WidgetFactory)
        .toDynamicValue(({ container }) => ({
            id: TopBarWidget.ID,
            createWidget: () => container.get(TopBarWidget),
        }))
        .inSingletonScope();

    bind(BottomBarWidget).toSelf();
    bind(WidgetFactory)
        .toDynamicValue(({ container }) => ({
            id: BottomBarWidget.ID,
            createWidget: () => container.get(BottomBarWidget),
        }))
        .inSingletonScope();

    bind(RightSideBarWidget).toSelf();
    bind(WidgetFactory)
        .toDynamicValue(({ container }) => ({
            id: RightSideBarWidget.ID,
            createWidget: () => container.get(RightSideBarWidget),
        }))
        .inSingletonScope();

    bind(LeftSideBarWidget).toSelf();
    bind(WidgetFactory)
        .toDynamicValue(({ container }) => ({
            id: LeftSideBarWidget.ID,
            createWidget: () => container.get(LeftSideBarWidget),
        }))
        .inSingletonScope();
});
