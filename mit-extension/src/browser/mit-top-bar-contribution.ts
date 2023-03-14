import { injectable } from "@theia/core/shared/inversify";
import { AbstractViewContribution } from "@theia/core/lib/browser";
import { TopBarWidget } from "./mit-top-bar-widget";

@injectable()
export class TopBarContribution extends AbstractViewContribution<TopBarWidget> {
    /**
     * `AbstractViewContribution` handles the creation and registering
     *  of the widget including commands, menus, and keybindings.
     *
     * We can pass `defaultWidgetOptions` which define widget properties such as
     * its location `area` (`main`, `left`, `right`, `bottom`), `mode`, and `ref`.
     *
     */
    constructor() {
        super({
            widgetId: TopBarWidget.ID,
            widgetName: TopBarWidget.LABEL,
            defaultWidgetOptions: { area: "left" },
        });
    }

    async initializeLayout(): Promise<void> {
        await this.openView();
    }
}
