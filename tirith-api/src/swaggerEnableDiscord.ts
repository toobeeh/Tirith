export const swaggerEnableDiscordLogin = `
const config = { attributes: true, childList: true, subtree: true };

// Callback function to execute when mutations are observed
const callback = function (mutationsList, observer) {
  for (const mutation of mutationsList) {
    if (mutation.type === 'childList') {

      mutation.addedNodes.forEach(node => {
        const target = node.querySelector("input[aria-label=auth-bearer-value]");
        if (target) {
          target.insertAdjacentHTML("afterEnd", '<button id="loginFromDiscord" type="submit" class="btn authorize modal-btn button">Login with Discord</button>');
          document.querySelector("#loginFromDiscord").addEventListener("click", () => {
            /* handler for window messages */
            const listenOnce = () => {
              window.addEventListener("message", async event => {

                if (!event.data || !event.data.accessToken || event.data.accessToken == "") listenOnce();
                else {
                  const accessToken = event.data.accessToken;
                  console.log("Logged in with token: ", accessToken);
                  var nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
                  nativeInputValueSetter.call(target, accessToken);
                  target.dispatchEvent(new Event("input", { bubbles:true }))
                  document.querySelector("div.auth-btn-wrapper > button.btn.modal-btn.auth.authorize.button").click();
                }
              }, { once: true });
            }

            listenOnce();

            window.open('https://www.typo.rip/auth/', 'Log in to Palantir', 'height=650,width=500,right=0,top=100,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes');
          });
        }
      });
    }
  }
};

// Create an observer instance linked to the callback function
const observer = new MutationObserver(callback);

// Start observing the target node for configured mutations
observer.observe(document.body, config);
`;