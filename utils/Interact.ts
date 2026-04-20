import { Locator } from "@playwright/test";
import { Logger } from "./logger"; // adjust import to your logger path

export class InteractUtil {
    constructor(private readonly log: Logger) {}

    async click(locator: Locator, label: string): Promise<void> {
        try {
            await locator.waitFor({ state: "visible" });
            await locator.click();
            this.log.info(`Clicked on "${label}"`);
        } catch (error) {
            this.log.error(`Failed to click on "${label}": ${error}`);
            throw error;
        }
    }

    async write(locator: Locator, value: string, fieldName: string): Promise<void> {
        try {
            await locator.waitFor({ state: "visible" });
            await locator.clear();
            await locator.fill(value);
            this.log.info(`Sent "${value}" to "${fieldName}" input`);
        } catch (error) {
            this.log.error(`Failed to write "${value}" to "${fieldName}": ${error}`);
            throw error;
        }
    }

    async checkBox(locator: Locator, label: string): Promise<void> {
        try {
            await locator.waitFor({ state: "visible" });
            await locator.check();
            this.log.info(`Checked "${label}" checkbox`);
        } catch (error) {
            this.log.error(`Failed to check "${label}" checkbox: ${error}`);
            throw error;
        }
    }

    async uncheckBox(locator: Locator, label: string): Promise<void> {
        try {
            await locator.waitFor({ state: "visible" });
            await locator.uncheck();
            this.log.info(`Unchecked "${label}" checkbox`);
        } catch (error) {
            this.log.error(`Failed to uncheck "${label}" checkbox: ${error}`);
            throw error;
        }
    }

    async getText(locator: Locator, label: string): Promise<string> {
        try {
            await locator.waitFor({ state: "visible" });
            const text = (await locator.textContent()) ?? "";
            this.log.info(`Got text from "${label}": "${text.trim()}"`);
            return text.trim();
        } catch (error) {
            this.log.error(`Failed to get text from "${label}": ${error}`);
            throw error;
        }
    }

    async hover(locator: Locator, label: string): Promise<void> {
        try {
            await locator.waitFor({ state: "visible" });
            await locator.hover();
            this.log.info(`Hovered over "${label}"`);
        } catch (error) {
            this.log.error(`Failed to hover over "${label}": ${error}`);
            throw error;
        }
    }

    async selectOption(locator: Locator, value: string, label: string): Promise<void> {
        try {
            await locator.waitFor({ state: "visible" });
            await locator.selectOption(value);
            this.log.info(`Selected "${value}" from "${label}" dropdown`);
        } catch (error) {
            this.log.error(`Failed to select "${value}" from "${label}": ${error}`);
            throw error;
        }
    }

    async getAttribute(locator: Locator, attribute: string, label: string): Promise<string> {
        try {
            await locator.waitFor({ state: "visible" });
            const value = (await locator.getAttribute(attribute)) ?? "";
            this.log.info(`Got attribute "${attribute}" from "${label}": "${value}"`);
            return value;
        } catch (error) {
            this.log.error(`Failed to get attribute "${attribute}" from "${label}": ${error}`);
            throw error;
        }
    }

    async isVisible(locator: Locator, label: string): Promise<boolean> {
        try {
            const visible = await locator.isVisible();
            this.log.info(`"${label}" is ${visible ? "visible" : "not visible"}`);
            return visible;
        } catch (error) {
            this.log.error(`Failed to check visibility of "${label}": ${error}`);
            throw error;
        }
    }

    async isEnabled(locator: Locator, label: string): Promise<boolean> {
        try {
            const enabled = await locator.isEnabled();
            this.log.info(`"${label}" is ${enabled ? "enabled" : "disabled"}`);
            return enabled;
        } catch (error) {
            this.log.error(`Failed to check if "${label}" is enabled: ${error}`);
            throw error;
        }
    }

    async waitForVisible(locator: Locator, label: string, timeout = 5000): Promise<void> {
        try {
            await locator.waitFor({ state: "visible", timeout });
            this.log.info(`"${label}" became visible`);
        } catch (error) {
            this.log.error(`"${label}" did not become visible within ${timeout}ms: ${error}`);
            throw error;
        }
    }

    async waitForHidden(locator: Locator, label: string, timeout = 5000): Promise<void> {
        try {
            await locator.waitFor({ state: "hidden", timeout });
            this.log.info(`"${label}" became hidden`);
        } catch (error) {
            this.log.error(`"${label}" did not become hidden within ${timeout}ms: ${error}`);
            throw error;
        }
    }

    async pressKey(locator: Locator, key: string, label: string): Promise<void> {
        try {
            await locator.waitFor({ state: "visible" });
            await locator.press(key);
            this.log.info(`Pressed "${key}" on "${label}"`);
        } catch (error) {
            this.log.error(`Failed to press "${key}" on "${label}": ${error}`);
            throw error;
        }
    }

    async doubleClick(locator: Locator, label: string): Promise<void> {
        try {
            await locator.waitFor({ state: "visible" });
            await locator.dblclick();
            this.log.info(`Double-clicked on "${label}"`);
        } catch (error) {
            this.log.error(`Failed to double-click on "${label}": ${error}`);
            throw error;
        }
    }

    async scrollIntoView(locator: Locator, label: string): Promise<void> {
        try {
            await locator.scrollIntoViewIfNeeded();
            this.log.info(`Scrolled "${label}" into view`);
        } catch (error) {
            this.log.error(`Failed to scroll "${label}" into view: ${error}`);
            throw error;
        }
    }

    async getCount(locator: Locator, label: string): Promise<number> {
        try {
            const count = await locator.count();
            this.log.info(`Found ${count} "${label}" element(s)`);
            return count;
        } catch (error) {
            this.log.error(`Failed to get count of "${label}": ${error}`);
            throw error;
        }
    }
}