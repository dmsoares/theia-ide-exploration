import { Layout, SplitPanel } from "@phosphor/widgets";
import { ApplicationShell } from "@theia/core/lib/browser";
import { injectable } from "@theia/core/shared/inversify";

@injectable()
export class MitApplicationShell extends ApplicationShell {
    /**
     * Assemble the application shell layout. Override this method in order to change the arrangement
     * of the main area and the side panels.
     */
    protected override createLayout(): Layout {
        const bottomSplitLayout = this.createSplitLayout(
            [this.mainPanel, this.bottomPanel],
            [1, 0],
            { orientation: "vertical", spacing: 0 }
        );
        const panelForBottomArea = new SplitPanel({
            layout: bottomSplitLayout,
        });
        panelForBottomArea.id = "theia-bottom-split-panel";

        const leftRightSplitLayout = this.createSplitLayout(
            [panelForBottomArea],
            [1],
            { orientation: "horizontal", spacing: 0 }
        );
        const panelForSideAreas = new SplitPanel({
            layout: leftRightSplitLayout,
        });
        panelForSideAreas.id = "theia-left-right-split-panel";

        return this.createBoxLayout([panelForSideAreas], [1], {
            direction: "top-to-bottom",
            spacing: 0,
        });
    }
}
