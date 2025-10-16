# Contributing to OpenINS 🚀

First off, thank you for considering contributing to OpenINS! We're thrilled you're interested in making this project better. Every contribution, from a small typo fix to a new feature, is valuable.

This document provides guidelines for contributing to the project.

> **Note:** Please note that this project is released with a Contributor [Code of Conduct](CODE_OF_CONDUCT.md). By participating in this project you agree to abide by its terms.

## How Can I Contribute?

There are many ways to contribute to the project, and all are welcome:

* **🐛 Reporting Bugs:** If you find a bug in the firmware or an error in the hardware design, please open an issue and describe it with as much detail as possible.
* **💡 Suggesting Enhancements:** Have an idea for a new feature or an improvement to the existing design? Open an issue to start a discussion.
* **📚 Improving Documentation:** Our goal is to be a great reference guide. If you find parts of the README, comments, or the MkDocs site that are unclear, please submit a pull request with your improvements. This is one of the easiest ways to get started!
* **💻 Submitting Code or Hardware Changes:** If you want to fix a bug or implement a new feature, you can do so through a pull request.

## Your First Contribution (Pull Request Guide)

Ready to submit a change? Here’s a step-by-step guide to making your first contribution.

1. **Fork the repository** to your own GitHub account.
2. **Clone your fork** to your local machine: `git clone https://github.com/Bubi2001/OpenINS.git`
3. **Create a new branch** for your changes. Please use a descriptive name.

    ```bash
   git checkout -b feature/my-new-feature
    ```

4. **Make your changes!** Whether you're editing KiCad files, C code for the firmware, or documentation, this is your time to shine.
5. **Follow the Style Guides** (see below). If you've made code changes, please format your code before committing.
6. **Commit your changes** with a clear and descriptive commit message. We follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification.

    ```bash
    git commit -m "feat: Add support for a new barometer sensor"
    ```

7. **Push your changes** to your fork on GitHub.

    ```bash
    git push origin feature/my-new-feature
    ```

8. **Open a Pull Request** from your branch to the `main` branch of the original OpenINS repository. Provide a clear title and a detailed description of the changes you've made.

## Pull Request Process

Once you've submitted a pull request, a few things will happen:

1. **CI Checks:** Our GitHub Actions workflow will automatically run. It will check code formatting, build the firmware, and run hardware checks. Your pull request must pass all these checks.
2. **Code Review:** A maintainer will review your changes. We may ask for modifications or provide feedback.
3. **Merge:** Once your pull request is approved and all checks have passed, a maintainer will merge it into the main codebase. Congratulations! 🎉

## Style Guides

### C Code

* All C code must be formatted using `clang-format`. Please run the formatter before committing your changes. The style is defined in the `.clang-format` file in the repository root.

### Commit Messages

* We use the **Conventional Commits** standard. This helps us automate release notes and makes the project history easy to read.
* Your commit message should start with a type, like `feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `test:`, or `chore:`.
  * **Example (new feature):** `feat: Implement calibration routine for gyroscope`
  * **Example (bug fix):** `fix: Correct SPI communication timing issue`
  * **Example (documentation):** `docs: Add detailed instructions for flashing firmware`
