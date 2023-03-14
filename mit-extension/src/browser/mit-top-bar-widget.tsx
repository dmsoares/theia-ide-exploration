import React = require("react");
import { ReactWidget } from "@theia/core/lib/browser";
import { injectable, postConstruct } from "@theia/core/shared/inversify";

@injectable()
export class TopBarWidget extends ReactWidget {
    static readonly ID = "top-bar:widget";
    static readonly LABEL = "Top Bar Widget";

    constructor() {
        super();
        this.node.tabIndex = 0;
        this.id = TopBarWidget.ID;
        this.addClass("mit-top-bar");
    }

    @postConstruct()
    protected async init(): Promise<void> {
        this.id = TopBarWidget.ID;
        this.title.closable = false;
        this.update();
    }
    render(): React.ReactElement {
        return (
            <div className="mit-top-bar-banner">
                <div className="mit-top-bar-tab">Recap</div>
                <div className="mit-top-bar-tab selected">Exercise</div>
            </div>
        );
    }
}
