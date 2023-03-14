import React = require("react");
import { ReactWidget } from "@theia/core/lib/browser";
import { injectable, postConstruct } from "@theia/core/shared/inversify";

@injectable()
export class LeftSideBarWidget extends ReactWidget {
    static readonly ID = "left-side-bar:widget";
    static readonly LABEL = "Left Side Bar Widget";

    constructor() {
        super();
        this.node.tabIndex = 0;
        this.id = LeftSideBarWidget.ID;
        this.addClass("mit-left-side-bar");
    }

    @postConstruct()
    protected async init(): Promise<void> {
        this.id = LeftSideBarWidget.ID;
        this.title.closable = false;
        this.update();
    }
    render(): React.ReactElement {
        return <div className="mit-left-side-bar-banner"></div>;
    }
}
