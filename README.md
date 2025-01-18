<div align="left" style="position: relative;">
<img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/ec559a9f6bfd399b82bb44393651661b08aaf7ba/icons/folder-markdown-open.svg" align="right" width="30%" style="margin: -20px 0 0 20px;">
<h1>CIPHERHAVEN</h1>
<p align="left">
</p>
<p align="left">
	<img src="https://img.shields.io/github/license/Ankur0310/CipherHaven?style=default&logo=opensourceinitiative&logoColor=white&color=0080ff" alt="license">
	<img src="https://img.shields.io/github/last-commit/Ankur0310/CipherHaven?style=default&logo=git&logoColor=white&color=0080ff" alt="last-commit">
	<img src="https://img.shields.io/github/languages/top/Ankur0310/CipherHaven?style=default&color=0080ff" alt="repo-top-language">
	<img src="https://img.shields.io/github/languages/count/Ankur0310/CipherHaven?style=default&color=0080ff" alt="repo-language-count">
</p>
<p align="left"><!-- default option, no dependency badges. -->
</p>
<p align="left">
	<!-- default option, no dependency badges. -->
</p>
</div>
<br clear="right">

##  Table of Contents

- [ Overview](#-overview)
- [ Features](#-features)
- [ Project Structure](#-project-structure)
  - [ Project Index](#-project-index)
- [ Getting Started](#-getting-started)
  - [ Prerequisites](#-prerequisites)
  - [ Installation](#-installation)
- [ Contributing](#-contributing)
- [ License](#-license)


---

##  Overview

# CipherHaven: Real-Time Cryptographic Vulnerability Analyzer

CipherHaven is a real-time cryptographic vulnerability analyzer that empowers users to identify and mitigate risks in cryptographic systems. By combining practical learning with interactive tools, CipherHaven bridges the gap between theoretical cryptography and real-world cybersecurity applications. It serves as an educational platform for developers, cybersecurity enthusiasts, and students to explore cryptographic principles, uncover vulnerabilities, and adopt best practices.

---

## Key Highlights

- **Interactive Visualizations**: Dive deep into how common cryptographic algorithms like AES, RSA, and SHA-256 work, with adjustable parameters to explore their security and performance implications.
- **Vulnerability Scanner**: Simulate cryptographic setups and receive real-time feedback on potential weaknesses, including risks associated with short key lengths, weak algorithms, and improper configurations.
- **Attack Simulation Lab**: Experience educational simulations of common attacks such as Man-in-the-Middle and Replay Attacks.
- **Best Practices Checker**: Assess cryptographic configurations against industry standards to ensure compliance and secure implementations.
- **Gamified Learning**: Challenge yourself with Capture-the-Flag (CTF)-style tasks that simulate real-world cryptographic vulnerabilities, tailored to different skill levels.

---

## Features

### Interactive Cryptographic Visualizations
- Visualize encryption and decryption processes for algorithms like RSA, AES, and SHA-256.
- Adjust parameters like key length, padding, and block modes to observe their impact on security and efficiency.

### Real-Time Vulnerability Scanner
- Analyze configurations for popular cryptographic algorithms.
- Highlight risks such as:
  - Use of deprecated or weak algorithms (e.g., MD5, short RSA keys).
  - Incorrect padding or mode selections.
  - Insufficient key management practices.
- Provide examples of exploits, including brute force and dictionary attacks.

### Attack Simulation Lab
- Simulate and understand common cryptographic attacks, including:
  - **Man-in-the-Middle Attacks**: Visualize interception flaws due to improper key exchanges.
  - **Replay Attacks**: Learn about vulnerabilities in session key implementations.

### Best Practices Checker
- Validate cryptographic configurations against NIST and OWASP guidelines.
- Flag non-compliance issues and provide actionable recommendations for improvement.
- Suggest transitioning to modern algorithms and configurations where needed.

### Gamified Challenges
- Solve CTF-style challenges with progressive difficulty levels.
- Identify and fix cryptographic vulnerabilities in simulated environments.
- Earn badges and track your progress through an intuitive interface.

---

##  Project Structure

```sh
└── CipherHaven/
    ├── app
    │   ├── (auth)
    │   ├── (dashboard)
    │   ├── globals.css
    │   ├── layout.tsx
    │   └── page.tsx
    ├── challenges.ts
    ├── components
    │   ├── AESScanner.tsx
    │   ├── HashScanner.tsx
    │   ├── InputPanel.tsx
    │   ├── MITMSimulation.tsx
    │   ├── RSAScanner.tsx
    │   ├── ReplayAttackSimulation.tsx
    │   ├── Report.tsx
    │   ├── StageVisualizer.tsx
    │   ├── aes.tsx
    │   ├── rsa.tsx
    │   ├── sha256.tsx
    │   └── ui
    ├── components.json
    ├── hooks
    │   └── use-toast.ts
    ├── lib
    │   └── utils.ts
    ├── next.config.js
    ├── package-lock.json
    ├── package.json
    ├── postcss.config.js
    ├── tailwind.config.ts
    ├── tsconfig.json
    ├── types.ts
    └── utils
        ├── aesAnalyzer.ts
        ├── hashAnalyzer.ts
        ├── rsaAnalyzer.ts
        └── sha256.ts
```


###  Project Index
<details open>
	<summary><b><code>CIPHERHAVEN/</code></b></summary>
	<details> <!-- __root__ Submodule -->
		<summary><b>__root__</b></summary>
		<blockquote>
			<table>
			<tr>
				<td><b><a href='https://github.com/Ankur0310/CipherHaven/blob/master/postcss.config.js'>postcss.config.js</a></b></td>
				<td><code>❯ REPLACE-ME</code></td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/Ankur0310/CipherHaven/blob/master/types.ts'>types.ts</a></b></td>
				<td><code>❯ REPLACE-ME</code></td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/Ankur0310/CipherHaven/blob/master/package-lock.json'>package-lock.json</a></b></td>
				<td><code>❯ REPLACE-ME</code></td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/Ankur0310/CipherHaven/blob/master/challenges.ts'>challenges.ts</a></b></td>
				<td><code>❯ REPLACE-ME</code></td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/Ankur0310/CipherHaven/blob/master/tsconfig.json'>tsconfig.json</a></b></td>
				<td><code>❯ REPLACE-ME</code></td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/Ankur0310/CipherHaven/blob/master/next.config.js'>next.config.js</a></b></td>
				<td><code>❯ REPLACE-ME</code></td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/Ankur0310/CipherHaven/blob/master/package.json'>package.json</a></b></td>
				<td><code>❯ REPLACE-ME</code></td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/Ankur0310/CipherHaven/blob/master/components.json'>components.json</a></b></td>
				<td><code>❯ REPLACE-ME</code></td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/Ankur0310/CipherHaven/blob/master/tailwind.config.ts'>tailwind.config.ts</a></b></td>
				<td><code>❯ REPLACE-ME</code></td>
			</tr>
			</table>
		</blockquote>
	</details>
	<details> <!-- lib Submodule -->
		<summary><b>lib</b></summary>
		<blockquote>
			<table>
			<tr>
				<td><b><a href='https://github.com/Ankur0310/CipherHaven/blob/master/lib/utils.ts'>utils.ts</a></b></td>
				<td><code>❯ REPLACE-ME</code></td>
			</tr>
			</table>
		</blockquote>
	</details>
	<details> <!-- components Submodule -->
		<summary><b>components</b></summary>
		<blockquote>
			<table>
			<tr>
				<td><b><a href='https://github.com/Ankur0310/CipherHaven/blob/master/components/ReplayAttackSimulation.tsx'>ReplayAttackSimulation.tsx</a></b></td>
				<td><code>❯ REPLACE-ME</code></td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/Ankur0310/CipherHaven/blob/master/components/sha256.tsx'>sha256.tsx</a></b></td>
				<td><code>❯ REPLACE-ME</code></td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/Ankur0310/CipherHaven/blob/master/components/InputPanel.tsx'>InputPanel.tsx</a></b></td>
				<td><code>❯ REPLACE-ME</code></td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/Ankur0310/CipherHaven/blob/master/components/HashScanner.tsx'>HashScanner.tsx</a></b></td>
				<td><code>❯ REPLACE-ME</code></td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/Ankur0310/CipherHaven/blob/master/components/Report.tsx'>Report.tsx</a></b></td>
				<td><code>❯ REPLACE-ME</code></td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/Ankur0310/CipherHaven/blob/master/components/RSAScanner.tsx'>RSAScanner.tsx</a></b></td>
				<td><code>❯ REPLACE-ME</code></td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/Ankur0310/CipherHaven/blob/master/components/StageVisualizer.tsx'>StageVisualizer.tsx</a></b></td>
				<td><code>❯ REPLACE-ME</code></td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/Ankur0310/CipherHaven/blob/master/components/MITMSimulation.tsx'>MITMSimulation.tsx</a></b></td>
				<td><code>❯ REPLACE-ME</code></td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/Ankur0310/CipherHaven/blob/master/components/aes.tsx'>aes.tsx</a></b></td>
				<td><code>❯ REPLACE-ME</code></td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/Ankur0310/CipherHaven/blob/master/components/AESScanner.tsx'>AESScanner.tsx</a></b></td>
				<td><code>❯ REPLACE-ME</code></td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/Ankur0310/CipherHaven/blob/master/components/rsa.tsx'>rsa.tsx</a></b></td>
				<td><code>❯ REPLACE-ME</code></td>
			</tr>
			</table>
			<details>
				<summary><b>ui</b></summary>
				<blockquote>
					<table>
					<tr>
						<td><b><a href='https://github.com/Ankur0310/CipherHaven/blob/master/components/ui/context-menu.tsx'>context-menu.tsx</a></b></td>
						<td><code>❯ REPLACE-ME</code></td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/Ankur0310/CipherHaven/blob/master/components/ui/toaster.tsx'>toaster.tsx</a></b></td>
						<td><code>❯ REPLACE-ME</code></td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/Ankur0310/CipherHaven/blob/master/components/ui/accordion.tsx'>accordion.tsx</a></b></td>
						<td><code>❯ REPLACE-ME</code></td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/Ankur0310/CipherHaven/blob/master/components/ui/alert-dialog.tsx'>alert-dialog.tsx</a></b></td>
						<td><code>❯ REPLACE-ME</code></td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/Ankur0310/CipherHaven/blob/master/components/ui/radio-group.tsx'>radio-group.tsx</a></b></td>
						<td><code>❯ REPLACE-ME</code></td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/Ankur0310/CipherHaven/blob/master/components/ui/checkbox.tsx'>checkbox.tsx</a></b></td>
						<td><code>❯ REPLACE-ME</code></td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/Ankur0310/CipherHaven/blob/master/components/ui/input-otp.tsx'>input-otp.tsx</a></b></td>
						<td><code>❯ REPLACE-ME</code></td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/Ankur0310/CipherHaven/blob/master/components/ui/sheet.tsx'>sheet.tsx</a></b></td>
						<td><code>❯ REPLACE-ME</code></td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/Ankur0310/CipherHaven/blob/master/components/ui/progress.tsx'>progress.tsx</a></b></td>
						<td><code>❯ REPLACE-ME</code></td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/Ankur0310/CipherHaven/blob/master/components/ui/badge.tsx'>badge.tsx</a></b></td>
						<td><code>❯ REPLACE-ME</code></td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/Ankur0310/CipherHaven/blob/master/components/ui/breadcrumb.tsx'>breadcrumb.tsx</a></b></td>
						<td><code>❯ REPLACE-ME</code></td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/Ankur0310/CipherHaven/blob/master/components/ui/pagination.tsx'>pagination.tsx</a></b></td>
						<td><code>❯ REPLACE-ME</code></td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/Ankur0310/CipherHaven/blob/master/components/ui/label.tsx'>label.tsx</a></b></td>
						<td><code>❯ REPLACE-ME</code></td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/Ankur0310/CipherHaven/blob/master/components/ui/scroll-area.tsx'>scroll-area.tsx</a></b></td>
						<td><code>❯ REPLACE-ME</code></td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/Ankur0310/CipherHaven/blob/master/components/ui/input.tsx'>input.tsx</a></b></td>
						<td><code>❯ REPLACE-ME</code></td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/Ankur0310/CipherHaven/blob/master/components/ui/textarea.tsx'>textarea.tsx</a></b></td>
						<td><code>❯ REPLACE-ME</code></td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/Ankur0310/CipherHaven/blob/master/components/ui/toast.tsx'>toast.tsx</a></b></td>
						<td><code>❯ REPLACE-ME</code></td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/Ankur0310/CipherHaven/blob/master/components/ui/separator.tsx'>separator.tsx</a></b></td>
						<td><code>❯ REPLACE-ME</code></td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/Ankur0310/CipherHaven/blob/master/components/ui/toggle-group.tsx'>toggle-group.tsx</a></b></td>
						<td><code>❯ REPLACE-ME</code></td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/Ankur0310/CipherHaven/blob/master/components/ui/command.tsx'>command.tsx</a></b></td>
						<td><code>❯ REPLACE-ME</code></td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/Ankur0310/CipherHaven/blob/master/components/ui/popover.tsx'>popover.tsx</a></b></td>
						<td><code>❯ REPLACE-ME</code></td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/Ankur0310/CipherHaven/blob/master/components/ui/slider.tsx'>slider.tsx</a></b></td>
						<td><code>❯ REPLACE-ME</code></td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/Ankur0310/CipherHaven/blob/master/components/ui/form.tsx'>form.tsx</a></b></td>
						<td><code>❯ REPLACE-ME</code></td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/Ankur0310/CipherHaven/blob/master/components/ui/select.tsx'>select.tsx</a></b></td>
						<td><code>❯ REPLACE-ME</code></td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/Ankur0310/CipherHaven/blob/master/components/ui/button.tsx'>button.tsx</a></b></td>
						<td><code>❯ REPLACE-ME</code></td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/Ankur0310/CipherHaven/blob/master/components/ui/drawer.tsx'>drawer.tsx</a></b></td>
						<td><code>❯ REPLACE-ME</code></td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/Ankur0310/CipherHaven/blob/master/components/ui/toggle.tsx'>toggle.tsx</a></b></td>
						<td><code>❯ REPLACE-ME</code></td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/Ankur0310/CipherHaven/blob/master/components/ui/dialog.tsx'>dialog.tsx</a></b></td>
						<td><code>❯ REPLACE-ME</code></td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/Ankur0310/CipherHaven/blob/master/components/ui/alert.tsx'>alert.tsx</a></b></td>
						<td><code>❯ REPLACE-ME</code></td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/Ankur0310/CipherHaven/blob/master/components/ui/carousel.tsx'>carousel.tsx</a></b></td>
						<td><code>❯ REPLACE-ME</code></td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/Ankur0310/CipherHaven/blob/master/components/ui/navigation-menu.tsx'>navigation-menu.tsx</a></b></td>
						<td><code>❯ REPLACE-ME</code></td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/Ankur0310/CipherHaven/blob/master/components/ui/table.tsx'>table.tsx</a></b></td>
						<td><code>❯ REPLACE-ME</code></td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/Ankur0310/CipherHaven/blob/master/components/ui/tabs.tsx'>tabs.tsx</a></b></td>
						<td><code>❯ REPLACE-ME</code></td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/Ankur0310/CipherHaven/blob/master/components/ui/skeleton.tsx'>skeleton.tsx</a></b></td>
						<td><code>❯ REPLACE-ME</code></td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/Ankur0310/CipherHaven/blob/master/components/ui/switch.tsx'>switch.tsx</a></b></td>
						<td><code>❯ REPLACE-ME</code></td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/Ankur0310/CipherHaven/blob/master/components/ui/dropdown-menu.tsx'>dropdown-menu.tsx</a></b></td>
						<td><code>❯ REPLACE-ME</code></td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/Ankur0310/CipherHaven/blob/master/components/ui/collapsible.tsx'>collapsible.tsx</a></b></td>
						<td><code>❯ REPLACE-ME</code></td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/Ankur0310/CipherHaven/blob/master/components/ui/menubar.tsx'>menubar.tsx</a></b></td>
						<td><code>❯ REPLACE-ME</code></td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/Ankur0310/CipherHaven/blob/master/components/ui/resizable.tsx'>resizable.tsx</a></b></td>
						<td><code>❯ REPLACE-ME</code></td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/Ankur0310/CipherHaven/blob/master/components/ui/chart.tsx'>chart.tsx</a></b></td>
						<td><code>❯ REPLACE-ME</code></td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/Ankur0310/CipherHaven/blob/master/components/ui/avatar.tsx'>avatar.tsx</a></b></td>
						<td><code>❯ REPLACE-ME</code></td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/Ankur0310/CipherHaven/blob/master/components/ui/hover-card.tsx'>hover-card.tsx</a></b></td>
						<td><code>❯ REPLACE-ME</code></td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/Ankur0310/CipherHaven/blob/master/components/ui/aspect-ratio.tsx'>aspect-ratio.tsx</a></b></td>
						<td><code>❯ REPLACE-ME</code></td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/Ankur0310/CipherHaven/blob/master/components/ui/calendar.tsx'>calendar.tsx</a></b></td>
						<td><code>❯ REPLACE-ME</code></td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/Ankur0310/CipherHaven/blob/master/components/ui/tooltip.tsx'>tooltip.tsx</a></b></td>
						<td><code>❯ REPLACE-ME</code></td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/Ankur0310/CipherHaven/blob/master/components/ui/sonner.tsx'>sonner.tsx</a></b></td>
						<td><code>❯ REPLACE-ME</code></td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/Ankur0310/CipherHaven/blob/master/components/ui/card.tsx'>card.tsx</a></b></td>
						<td><code>❯ REPLACE-ME</code></td>
					</tr>
					</table>
				</blockquote>
			</details>
		</blockquote>
	</details>
	<details> <!-- hooks Submodule -->
		<summary><b>hooks</b></summary>
		<blockquote>
			<table>
			<tr>
				<td><b><a href='https://github.com/Ankur0310/CipherHaven/blob/master/hooks/use-toast.ts'>use-toast.ts</a></b></td>
				<td><code>❯ REPLACE-ME</code></td>
			</tr>
			</table>
		</blockquote>
	</details>
	<details> <!-- utils Submodule -->
		<summary><b>utils</b></summary>
		<blockquote>
			<table>
			<tr>
				<td><b><a href='https://github.com/Ankur0310/CipherHaven/blob/master/utils/rsaAnalyzer.ts'>rsaAnalyzer.ts</a></b></td>
				<td><code>❯ REPLACE-ME</code></td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/Ankur0310/CipherHaven/blob/master/utils/sha256.ts'>sha256.ts</a></b></td>
				<td><code>❯ REPLACE-ME</code></td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/Ankur0310/CipherHaven/blob/master/utils/hashAnalyzer.ts'>hashAnalyzer.ts</a></b></td>
				<td><code>❯ REPLACE-ME</code></td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/Ankur0310/CipherHaven/blob/master/utils/aesAnalyzer.ts'>aesAnalyzer.ts</a></b></td>
				<td><code>❯ REPLACE-ME</code></td>
			</tr>
			</table>
		</blockquote>
	</details>
	<details> <!-- app Submodule -->
		<summary><b>app</b></summary>
		<blockquote>
			<table>
			<tr>
				<td><b><a href='https://github.com/Ankur0310/CipherHaven/blob/master/app/layout.tsx'>layout.tsx</a></b></td>
				<td><code>❯ REPLACE-ME</code></td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/Ankur0310/CipherHaven/blob/master/app/globals.css'>globals.css</a></b></td>
				<td><code>❯ REPLACE-ME</code></td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/Ankur0310/CipherHaven/blob/master/app/page.tsx'>page.tsx</a></b></td>
				<td><code>❯ REPLACE-ME</code></td>
			</tr>
			</table>
			<details>
				<summary><b>(auth)</b></summary>
				<blockquote>
					<details>
						<summary><b>login</b></summary>
						<blockquote>
							<table>
							<tr>
								<td><b><a href='https://github.com/Ankur0310/CipherHaven/blob/master/app/(auth)/login/page.tsx'>page.tsx</a></b></td>
								<td><code>❯ REPLACE-ME</code></td>
							</tr>
							</table>
						</blockquote>
					</details>
					<details>
						<summary><b>register</b></summary>
						<blockquote>
							<table>
							<tr>
								<td><b><a href='https://github.com/Ankur0310/CipherHaven/blob/master/app/(auth)/register/page.tsx'>page.tsx</a></b></td>
								<td><code>❯ REPLACE-ME</code></td>
							</tr>
							</table>
						</blockquote>
					</details>
				</blockquote>
			</details>
			<details>
				<summary><b>(dashboard)</b></summary>
				<blockquote>
					<table>
					<tr>
						<td><b><a href='https://github.com/Ankur0310/CipherHaven/blob/master/app/(dashboard)/layout.tsx'>layout.tsx</a></b></td>
						<td><code>❯ REPLACE-ME</code></td>
					</tr>
					</table>
					<details>
						<summary><b>dashboard</b></summary>
						<blockquote>
							<table>
							<tr>
								<td><b><a href='https://github.com/Ankur0310/CipherHaven/blob/master/app/(dashboard)/dashboard/page.tsx'>page.tsx</a></b></td>
								<td><code>❯ REPLACE-ME</code></td>
							</tr>
							</table>
							<details>
								<summary><b>visualizer</b></summary>
								<blockquote>
									<table>
									<tr>
										<td><b><a href='https://github.com/Ankur0310/CipherHaven/blob/master/app/(dashboard)/dashboard/visualizer/page.tsx'>page.tsx</a></b></td>
										<td><code>❯ REPLACE-ME</code></td>
									</tr>
									</table>
								</blockquote>
							</details>
							<details>
								<summary><b>games</b></summary>
								<blockquote>
									<table>
									<tr>
										<td><b><a href='https://github.com/Ankur0310/CipherHaven/blob/master/app/(dashboard)/dashboard/games/page.tsx'>page.tsx</a></b></td>
										<td><code>❯ REPLACE-ME</code></td>
									</tr>
									</table>
								</blockquote>
							</details>
							<details>
								<summary><b>lab</b></summary>
								<blockquote>
									<table>
									<tr>
										<td><b><a href='https://github.com/Ankur0310/CipherHaven/blob/master/app/(dashboard)/dashboard/lab/page.tsx'>page.tsx</a></b></td>
										<td><code>❯ REPLACE-ME</code></td>
									</tr>
									</table>
								</blockquote>
							</details>
							<details>
								<summary><b>scanner</b></summary>
								<blockquote>
									<table>
									<tr>
										<td><b><a href='https://github.com/Ankur0310/CipherHaven/blob/master/app/(dashboard)/dashboard/scanner/page.tsx'>page.tsx</a></b></td>
										<td><code>❯ REPLACE-ME</code></td>
									</tr>
									</table>
								</blockquote>
							</details>
						</blockquote>
					</details>
				</blockquote>
			</details>
		</blockquote>
	</details>
</details>

---
##  Getting Started

###  Prerequisites

Before getting started with CipherHaven, ensure your runtime environment meets the following requirements:

- **Programming Language:** TypeScript
- **Package Manager:** Npm


###  Installation

Install CipherHaven using one of the following methods:

**Build from source:**

1. Clone the CipherHaven repository:
```sh
❯ git clone https://github.com/Ankur0310/CipherHaven
```

2. Navigate to the project directory:
```sh
❯ cd CipherHaven
```

3. Install the project dependencies:


**Using `npm`** &nbsp; [<img align="center" src="https://img.shields.io/badge/npm-CB3837.svg?style={badge_style}&logo=npm&logoColor=white" />](https://www.npmjs.com/)

```sh
❯ npm install
```




###  Usage
Run CipherHaven using the following command:
**Using `npm`** &nbsp; [<img align="center" src="https://img.shields.io/badge/npm-CB3837.svg?style={badge_style}&logo=npm&logoColor=white" />](https://www.npmjs.com/)

```sh
❯ npm start
```


##  Contributing

- **💬 [Join the Discussions](https://github.com/Ankur0310/CipherHaven/discussions)**: Share your insights, provide feedback, or ask questions.
- **🐛 [Report Issues](https://github.com/Ankur0310/CipherHaven/issues)**: Submit bugs found or log feature requests for the `CipherHaven` project.
- **💡 [Submit Pull Requests](https://github.com/Ankur0310/CipherHaven/blob/main/CONTRIBUTING.md)**: Review open PRs, and submit your own PRs.

<details closed>
<summary>Contributing Guidelines</summary>

1. **Fork the Repository**: Start by forking the project repository to your github account.
2. **Clone Locally**: Clone the forked repository to your local machine using a git client.
   ```sh
   git clone https://github.com/Ankur0310/CipherHaven
   ```
3. **Create a New Branch**: Always work on a new branch, giving it a descriptive name.
   ```sh
   git checkout -b new-feature-x
   ```
4. **Make Your Changes**: Develop and test your changes locally.
5. **Commit Your Changes**: Commit with a clear message describing your updates.
   ```sh
   git commit -m 'Implemented new feature x.'
   ```
6. **Push to github**: Push the changes to your forked repository.
   ```sh
   git push origin new-feature-x
   ```
7. **Submit a Pull Request**: Create a PR against the original project repository. Clearly describe the changes and their motivations.
8. **Review**: Once your PR is reviewed and approved, it will be merged into the main branch. Congratulations on your contribution!
</details>

<details closed>
<summary>Contributor Graph</summary>
<br>
<p align="left">
   <a href="https://github.com{/Ankur0310/CipherHaven/}graphs/contributors">
      <img src="https://contrib.rocks/image?repo=Ankur0310/CipherHaven">
   </a>
</p>
</details>

---

##  License

This project is protected under the [SELECT-A-LICENSE](https://choosealicense.com/licenses) License. For more details, refer to the [LICENSE](https://choosealicense.com/licenses/) file.

---

##  Acknowledgments

- List any resources, contributors, inspiration, etc. here.

---
