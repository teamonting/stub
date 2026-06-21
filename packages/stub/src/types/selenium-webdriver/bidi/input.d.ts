// @types/selenium-webdriver is out-of-date and we cannot use it.

declare module 'selenium-webdriver/bidi/input.js' {
  import { WebDriver, WebElement } from 'selenium-webdriver';

  /**
   * Represents the types of remote reference.
   */
  enum RemoteReferenceType {
    HANDLE = 'handle',
    SHARED_ID = 'sharedId',
  }

  /**
   * Represents a remote reference value.
   */
  class ReferenceValue {
    constructor(type: RemoteReferenceType | string, value: string);
    asMap(): { [key: string]: string };
  }

  /**
   * Origin for pointer and wheel actions.
   */
  interface ActionOrigin {
    type: 'element' | 'viewport' | 'pointer';
    element?: {
      sharedId: string;
      handle?: string;
    };
  }

  /**
   * Pointer move action.
   */
  interface PointerMoveAction {
    type: 'pointerMove';
    origin?: ActionOrigin | WebElement;
    x?: number;
    y?: number;
    duration?: number;
  }

  /**
   * Pointer down/up action.
   */
  interface PointerDownUpAction {
    type: 'pointerDown' | 'pointerUp';
    button?: number;
  }

  /**
   * Pointer cancel action.
   */
  interface PointerCancelAction {
    type: 'pointerCancel';
  }

  /**
   * Scroll action for wheel input.
   */
  interface ScrollAction {
    type: 'scroll';
    origin?: ActionOrigin | WebElement;
    x?: number;
    y?: number;
    deltaX?: number;
    deltaY?: number;
    duration?: number;
  }

  /**
   * Key action (for keyboard input).
   */
  interface KeyAction {
    type: 'keyDown' | 'keyUp';
    value?: string;
  }

  /**
   * Action sequence item.
   */
  type ActionItem = PointerMoveAction | PointerDownUpAction | PointerCancelAction | ScrollAction | KeyAction;

  /**
   * Action sequence (source).
   */
  interface ActionSequence {
    type: 'key' | 'pointer' | 'wheel';
    id?: string;
    parameters?: {
      pointerType?: 'mouse' | 'pen' | 'touch';
    };
    actions: ActionItem[];
  }

  /**
   * Represents commands and events related to the Input module (simulated user input).
   * Described in https://w3c.github.io/webdriver-bidi/#module-input.
   */
  class Input {
    constructor(driver: WebDriver);

    /**
     * Initializes the Input instance by setting up BiDi connection.
     * Must be called before using other methods.
     */
    init(): Promise<void>;

    /**
     * Performs the specified actions on the given browsing context.
     *
     * @param {string} browsingContextId - The ID of the browsing context.
     * @param {ActionSequence[]} actions - The actions to be performed.
     * @returns {Promise<any>} A promise that resolves with the response from the server.
     */
    perform(browsingContextId: string, actions: ActionSequence[]): Promise<any>;

    /**
     * Resets the input state in the specified browsing context.
     *
     * @param {string} browsingContextId - The ID of the browsing context.
     * @returns {Promise<any>} A promise that resolves when the release actions are sent.
     */
    release(browsingContextId: string): Promise<any>;

    /**
     * Sets the files property of a given input element.
     *
     * @param {string} browsingContextId - The ID of the browsing context.
     * @param {string | ReferenceValue} element - The ID of the element or a ReferenceValue object representing the element.
     * @param {string | string[]} files - The file path or an array of file paths to be set.
     * @throws {Error} If the element is not a string or a ReferenceValue.
     * @returns {Promise<void>} A promise that resolves when the files are set.
     */
    setFiles(browsingContextId: string, element: string | ReferenceValue, files: string | string[]): Promise<void>;
  }

  /**
   * Gets an Input instance for the specified WebDriver.
   * This function initializes the Input instance and returns it ready for use.
   *
   * @param {WebDriver} driver - The WebDriver instance.
   * @returns {Promise<Input>} A promise that resolves with an initialized Input instance.
   */
  function getInputInstance(driver: WebDriver): Promise<Input>;

  export default getInputInstance;
}
