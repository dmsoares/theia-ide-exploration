import { Layout, SplitPanel, BoxPanel } from "@phosphor/widgets";
import { ApplicationShell } from "@theia/core/lib/browser";
import { inject, injectable } from "@theia/core/shared/inversify";
import { RightPanelWidget } from "./mit-right-panel-widget";
import { TopBarWidget } from "./mit-top-bar-widget";
import { BottomBarWidget } from "./mit-bottom-bar-widget";
import { RightSideBarWidget } from "./mit-right-side-bar-widget";
import { LeftSideBarWidget } from "./mit-left-side-bar-widget";

@injectable()
export class MitApplicationShell extends ApplicationShell {
    /**
     * Assemble the application shell layout. Override this method in order to change the arrangement
     * of the main area and the side panels.
     */

    @inject(RightPanelWidget)
    protected readonly rightPanelWidget: RightPanelWidget;
    @inject(TopBarWidget)
    protected readonly topBarWidget: TopBarWidget;
    @inject(BottomBarWidget)
    protected readonly bottomBarWidget: BottomBarWidget;
    @inject(LeftSideBarWidget)
    protected readonly leftSideBarWidget: LeftSideBarWidget;
    @inject(RightSideBarWidget)
    protected readonly rightSideBarWidget: RightSideBarWidget;

    protected override createLayout(): Layout {
        const rightSplitLayout = this.createSplitLayout(
            [this.rightPanelWidget, this.bottomPanel],
            [1, 1],
            { orientation: "vertical", spacing: 0 }
        );
        const panelForRightArea = new SplitPanel({
            layout: rightSplitLayout,
        });
        panelForRightArea.id = "theia-right-split-panel";

        const mainLayout = this.createBoxLayout(
            [this.mainPanel, panelForRightArea],
            [10, 8],
            { direction: "left-to-right", spacing: 50 }
        );
        const mainPanel = new BoxPanel({ layout: mainLayout });
        mainPanel.id = "theia-main-panel";

        const layoutWithSidebars = this.createBoxLayout(
            [
                this.leftSideBarWidget,
                this.mainPanel,
                panelForRightArea,
                this.rightSideBarWidget,
            ],
            [1, 10, 8, 1],
            { direction: "left-to-right", spacing: 50 }
        );
        const mainPanelWithSidebars = new BoxPanel({
            layout: layoutWithSidebars,
        });
        mainPanel.id = "theia-main-panel-with-sidebars";

        return this.createBoxLayout(
            [this.topBarWidget, mainPanelWithSidebars, this.bottomBarWidget],
            [5, 40, 5],
            {
                direction: "top-to-bottom",
                spacing: 10,
            }
        );
    }
}
