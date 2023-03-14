import React = require("react");
import { ReactWidget } from "@theia/core/lib/browser";
import { injectable, postConstruct } from "@theia/core/shared/inversify";

@injectable()
export class BottomBarWidget extends ReactWidget {
    static readonly ID = "bottom-bar:widget";
    static readonly LABEL = "Bottom Bar Widget";

    constructor() {
        super();
        this.node.tabIndex = 0;
        this.id = BottomBarWidget.ID;
        this.addClass("mit-bottom-bar");
    }

    @postConstruct()
    protected async init(): Promise<void> {
        this.id = BottomBarWidget.ID;
        this.title.closable = false;
        this.update();
    }
    render(): React.ReactElement {
        return (
            <div className="mit-bottom-bar-banner">
                <div className="mit-button-container">
                    <div className="mit-button">Prev</div>
                    <div className="mit-button">Next</div>
                    <div className="mit-button">Reset</div>
                </div>
                <div className="mit-button-container">
                    <div className="mit-button">Execute</div>
                </div>
            </div>
        );
    }
}
