from playwright.sync_api import sync_playwright

def verify_giftlove():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # 1. Go to Home Page
        page.goto("http://localhost:8000/index.html")
        page.wait_for_timeout(1000)
        page.screenshot(path="verification/1_home.png")
        print("Screenshot 1: Home Page")

        # 2. Navigate to Mom Page
        page.click("text=For Mom")
        page.wait_for_timeout(1000)
        page.screenshot(path="verification/2_mom.png")
        print("Screenshot 2: Mom Page")

        # 3. Open Modal (Click a card)
        page.click(".gift-card")
        page.wait_for_selector("#giftModal.show")
        page.wait_for_timeout(500)
        page.screenshot(path="verification/3_modal.png")
        print("Screenshot 3: Modal Open")

        # 4. Fill Form and Submit
        page.fill("#recipientName", "Super Mom")
        page.fill("#message", "You are the best!")
        page.click(".send-btn")

        # 5. Verify Toast
        page.wait_for_selector("#toast.show")
        page.wait_for_timeout(500)
        page.screenshot(path="verification/4_toast.png")
        print("Screenshot 4: Toast Notification")

        # 6. Verify LocalStorage
        # Evaluate JS to check localStorage
        ls_content = page.evaluate("localStorage.getItem('giftLove_sent_cards')")
        print(f"LocalStorage Content: {ls_content}")

        browser.close()

if __name__ == "__main__":
    verify_giftlove()
