import React = require("react");
import { ReactWidget } from "@theia/core/lib/browser";
import { injectable, postConstruct } from "@theia/core/shared/inversify";

@injectable()
export class RightSideBarWidget extends ReactWidget {
    static readonly ID = "right-side-bar:widget";
    static readonly LABEL = "Right Side Bar Widget";

    constructor() {
        super();
        this.node.tabIndex = 0;
        this.id = RightSideBarWidget.ID;
        this.addClass("mit-right-side-bar");
    }

    @postConstruct()
    protected async init(): Promise<void> {
        this.id = RightSideBarWidget.ID;
        this.title.closable = false;
        this.update();
    }
    render(): React.ReactElement {
        return <div className="mit-right-side-bar-banner"></div>;
    }
}
