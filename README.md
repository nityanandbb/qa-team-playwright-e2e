# qa-team-playwright-e2e

Team assignments and learning followups

## Repository Setup

### Clone the Repository

```bash
git clone https://github.com/nityanandbb/qa-team-playwright-e2e.git
cd qa-team-playwright-e2e
```

---

## Branch Naming Convention

Create your own branch using:

```bash
git checkout -b <YourName>-<TaskName>
```

Example:

```bash
git checkout -b Ambuj-LoginTest
```

---

## Project Structure

### User Folder Creation

Create your own folder inside the `Users/` directory.

Example:

```bash
Users/Ambuj/
```

Inside your folder:

* Write Playwright automation code
* Add learning assignments
* Add practice scenarios
* Add reusable components/utilities if needed

---

## Commit Guidelines

### Commit Message Format

Always mention the ticket/task number in commit messages.

Format:

```bash
git commit -m "QA-101: Add login automation test"
```

Examples:

```bash
git commit -m "QA-145: Add checkout flow validation"
git commit -m "QA-210: Fix flaky dashboard test"
```

---

## Push Changes

```bash
git push origin <branch-name>
```

Example:

```bash
git push origin Ambuj-LoginTest
```

---

## Pull Request (PR) Process

### Raise PR to Main Branch

1. Open GitHub repository
2. Click `Compare & Pull Request`
3. Select:

   * Source Branch → Your branch
   * Target Branch → `main` or assigned feature branch

---

## PR Title Format

```text
[Ticket Number] Short Description
```

Example:

```text
[QA-101] Add Login Automation Test
```

---

## PR Description Template

```markdown
## Task Summary
Added login automation test for valid and invalid scenarios.

## Changes Done
- Added login page
- Added login test cases
- Added reusable auth utility

## Validation
- Executed locally
- All tests passed

## Ticket Reference
QA-101
```

---

## Reviewer Assignment

After creating PR, request review from:

* Nityanand
* Asawary
* Ambuj
* Divya

---

## Important Notes

* Pull latest changes before starting work
* Avoid pushing directly to `main`
* Keep PRs small and task-specific
* Add proper assertions and reusable code
* Follow Playwright + TypeScript best practices
* Mention blocker/issues clearly in PR comments

---

## Optional (But Mandatory for Team Projects)

Every PR should ideally contain:

* Ticket Number
* Screenshots/Reports (if UI related)
* Execution proof
* Proper folder structure
* Clean commit history

```
