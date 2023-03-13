import { Layout, SplitPanel } from "@phosphor/widgets";
import { ApplicationShell } from "@theia/core/lib/browser";
import { inject, injectable } from "@theia/core/shared/inversify";
import { RightPanelWidget } from "./mit-right-panel-widget";

@injectable()
export class MitApplicationShell extends ApplicationShell {
    /**
     * Assemble the application shell layout. Override this method in order to change the arrangement
     * of the main area and the side panels.
     */

    @inject(RightPanelWidget)
    protected readonly rightPanelWidget: RightPanelWidget;

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

        return this.createBoxLayout(
            [this.mainPanel, panelForRightArea],
            [3, 2],
            { direction: "left-to-right" }
        );
    }
}
