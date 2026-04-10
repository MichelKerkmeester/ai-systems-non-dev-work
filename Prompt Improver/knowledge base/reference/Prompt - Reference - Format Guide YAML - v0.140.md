# Prompt - Reference - Format Guide YAML - v0.140

Formatting guide for YAML output structure in prompt engineering with RCAF/CRAFT frameworks, file delivery standards, syntax validation, and format-specific best practices.

**Loading Condition:** ON-DEMAND
**Purpose:** Defines YAML syntax specifications, structure patterns, validation rules, and file delivery standards for prompt engineering output formatting.
**Scope:** YAML fundamentals, RCAF/CRAFT structures, file delivery protocols, format conversions, syntax validation, advanced patterns, and best practices.

## TABLE OF CONTENTS

  - 1. 🎯 OVERVIEW & PURPOSE
  - 2. 📐 YAML FORMAT FUNDAMENTALS
  - 3. 📦 FILE DELIVERY STANDARDS
  - 4. 🏗️ RCAF YAML STRUCTURE
  - 5. 🔧 CRAFT YAML STRUCTURE
  - 6. 🧠 ADVANCED YAML PATTERNS
  - 7. 🔄 FORMAT CONVERSIONS
  - 8. 📚 EXAMPLES & TEMPLATES
  - 9. ✅ SYNTAX VALIDATION
  - 10. 💎 BEST PRACTICES

---

## 1. 🎯 OVERVIEW & PURPOSE

### Why YAML Format?

YAML provides human-readable structured data with minimal syntax overhead, ideal for configuration-style prompts and multi-level hierarchies.

**Terminology:**
- **Framework** = Prompt organization (RCAF vs CRAFT)
- **Output Structure** = Data format (Standard/Markdown vs JSON vs YAML)

**See Also:** Markdown Format Guide, JSON Format Guide, Interactive Mode

| Aspect            | Markdown          | JSON            | YAML                     |
| ----------------- | ----------------- | --------------- | ------------------------ |
| **Readability**   | Natural language  | Structured data | Human-friendly structure |
| **Token Usage**   | Baseline          | +5-10%          | +3-7%                    |
| **Best For**      | Human interaction | API integration | Configuration, templates |
| **Framework Fit** | RCAF/CRAFT        | RCAF preferred  | RCAF optimal             |

---

## 2. 📐 YAML FORMAT FUNDAMENTALS

### Core Principles

1. **Indentation:** 2 spaces define hierarchy
2. **No Quotes:** For simple strings
3. **Lists:** Dash prefix for arrays
4. **Key-Value:** Colon separation
5. **Multi-line:** Literal (|) and folded (>) blocks

### Basic Structure

```yaml
instruction: Primary directive for the task
context: Essential background information
parameters:
  key1: value1
  nested:
    subkey: subvalue
output:
  format: desired structure
  constraints:
    - constraint one
    - constraint two
```

### Data Types

| Type           | Syntax        | Example                                 |
| -------------- | ------------- | --------------------------------------- |
| **String**     | No quotes     | `role: Data Analyst`                    |
| **Number**     | Direct value  | `limit: 100`                            |
| **Boolean**    | true/false    | `detailed: true`                        |
| **List**       | Dash prefix   | `- Python`<br>`- SQL`                   |
| **Object**     | Indented keys | `format:`<br>`  type: report`           |
| **Multi-line** | Pipe or >     | `description: \|`<br>`  Multiple lines` |

---

## 3. 📦 FILE DELIVERY STANDARDS

### Mandatory Requirements

**Core Rule:** Every enhancement MUST be delivered as a downloadable file (.yaml/.yml), NEVER inline or in chat.

**Delivery Methods:**
1. **Claude Desktop/IDE:** Create actual downloadable file using file creation tool
2. **CLI/Agent Mode:** Use `/Export` folder with format `[###] - descriptive-filename.yaml`

### Mandatory Header Format

**Single-line header at TOP of every YAML file:**
```
Mode: $yaml | Complexity: [level] | Framework: [RCAF/CRAFT]
```

### File Content Rules

| Allowed                            | Forbidden                               |
| ---------------------------------- | --------------------------------------- |
| Single-line header (with $ prefix) | Format Options section                  |
| YAML prompt content                | CLEAR Evaluation breakdown              |
|                                    | Processing Applied section              |
|                                    | Explanations (go in CHAT)               |
|                                    | Markdown formatting (\*\*, ###, \`\`\`) |
|                                    | Tab characters                          |
|                                    | Inconsistent indentation                |

### Format Lock Protocol

```
DETECTION: $yaml command identified
    ↓
LOCK: YAML-only output mode engaged
    ↓
GENERATE: Pure YAML structure
    ↓
VALIDATE: Is it valid YAML?
    ↓
If NO → STOP → REGENERATE
If YES → DELIVER as file
```

### Correct vs Incorrect

**✅ CORRECT:**
```
Mode: $yaml | Complexity: Medium | Framework: RCAF

role: Data analyst
context: Sales database analysis
action: Generate quarterly report
format:
  type: dashboard
  sections:
    - metrics
    - trends
```

**❌ INCORRECT (Markdown in YAML):**
```
**Role:** Data analyst
**Context:** Sales database analysis
```

**❌ INCORRECT (Explanatory text):**
```
Here's the YAML prompt:
```yaml
role: Data analyst
```

---

## 4. 🏗️ RCAF YAML STRUCTURE

### Template

```yaml
role: Specific expertise definition
context: Essential background information
action: Clear measurable task
format:
  structure: output type
  requirements:
    - requirement one
  constraints:
    - limit one
```

### Example: Analysis Task

```
Mode: $yaml | Complexity: Medium | Framework: RCAF

role: Financial analyst specializing in SaaS metrics
context: Q4 2024 revenue data from B2B platform
action: Calculate MRR growth and identify top 3 trends
format:
  structure: executive_summary
  length: 500_words
  include:
    - metrics
    - charts
    - recommendations
```

### Field Guidelines

| Field       | Required | Description      | Best Practices           |
| ----------- | -------- | ---------------- | ------------------------ |
| **role**    | Yes      | Expertise needed | Be specific about domain |
| **context** | Yes      | Essential info   | Include constraints      |
| **action**  | Yes      | Specific task    | Make measurable          |
| **format**  | Yes      | Output structure | Define sections          |

---

## 5. 🔧 CRAFT YAML STRUCTURE

### Template

```yaml
context:
  background: Full situation details
  constraints:
    - constraint one
  assumptions:
    - assumption one
role:
  expertise: Detailed expertise description
  perspective: Specific viewpoint
action:
  primary: Main task to accomplish
  subtasks:
    - task one
  deliverables:
    - deliverable one
format:
  structure: Output organization type
  specifications:
    length: word_count
    style: tone_and_voice
target:
  metrics:
    - metric one
  success_criteria: Definition of successful outcome
```

### Example: Complex Analysis

```
Mode: $yaml | Complexity: High | Framework: CRAFT

context:
  background: E-commerce platform experiencing 15% cart abandonment
  timeframe: Last 6 months
  data_available:
    - user_sessions
    - transaction_logs
    - surveys
  constraints:
    - GDPR compliance required
    - 30-day deadline
role:
  expertise: UX researcher with e-commerce specialization
  perspective: User-centric analysis approach
action:
  primary: Identify cart abandonment root causes
  subtasks:
    - Analyze user behavior patterns
    - Segment users by abandonment stage
    - Generate actionable recommendations
format:
  structure: research_report
  specifications:
    length: 2500_words
    visualizations:
      - flow_diagrams
      - heat_maps
target:
  metrics:
    - abandonment_rate_reduction
  success_criteria: Actionable insights reducing abandonment by 20%
```

---

## 6. 🧠 ADVANCED YAML PATTERNS

### Multi-Phase Process

```yaml
role: Project coordinator
context: Software deployment for enterprise client
phases:
  - name: Environment Preparation
    action: Setup and validate infrastructure
    outputs: [checklist, validation_report]
  - name: Deployment Execution
    action: Execute deployment procedures
    outputs: [deployment_log, test_results]
  - name: Post-Deployment
    action: Validate and monitor
    outputs: [performance_metrics, user_feedback]
format:
  per_phase: status_report
  final: comprehensive_summary
```

### Conditional Logic

```yaml
role: Customer service AI
context: Support ticket classification system
action: Route tickets based on criteria
routing_logic:
  technical:
    route_to: engineering
    conditions: [error, bug, crash]
  billing:
    route_to: finance
    priority: high
    conditions: [payment, invoice, subscription]
  general:
    route_to: support_tier_1
    default: true
format:
  response: routing_decision
  include: [department, priority, rationale]
```

### Template with Anchors

```yaml
defaults: &default_format
  style: professional
  tone: concise
  audience: technical

templates:
  analysis: &analysis_template
    structure: analytical_report
    <<: *default_format
    sections: [overview, methodology, findings, recommendations]

role: Data analyst
context: Customer behavior analysis needed
action: Analyze purchase patterns
format:
  <<: *analysis_template
  length: 2000_words
```

---

## 7. 🔄 FORMAT CONVERSIONS

**Cross-format guidance:** See Markdown Format Guide, JSON Format Guide, Interactive Mode

### Conversion Reference

| From         | To       | Key Changes                                       |
| ------------ | -------- | ------------------------------------------------- |
| **Markdown** | YAML     | Remove `**Field:**` → `field:`, lists with `-`    |
| **JSON**     | YAML     | Remove braces/quotes, indent nested objects       |
| **YAML**     | Markdown | Add `**Field:**` prefix, convert lists to bullets |
| **YAML**     | JSON     | Add braces/quotes, commas after values            |

### Example Conversion

**Markdown:**
```markdown
**Role:** Data analyst with SQL expertise.
**Context:** Sales database with 5 years data.
**Action:** Identify top performing products.
**Format:** Dashboard with charts.
```

**YAML:**
```yaml
role: Data analyst with SQL expertise
context: Sales database with 5 years data
action: Identify top performing products
format: Dashboard with charts
```

---

## 8. 📚 EXAMPLES & TEMPLATES

### Research Template

```yaml
role: Research analyst
context: ${RESEARCH_DOMAIN}
action:
  primary: Investigate ${RESEARCH_QUESTION}
  methodology: ${METHOD}
  scope: ${SCOPE_DEFINITION}
format:
  structure: research_paper
  sections: [abstract, introduction, methodology, findings, conclusion]
  citations: ${CITATION_STYLE}
  length: ${WORD_COUNT}
```

### Customer Segmentation

```yaml
role: Marketing data scientist
context: E-commerce platform with 100K customers, 2 years transaction history
action:
  primary: Perform customer segmentation using RFM analysis
  steps:
    - Calculate recency, frequency, monetary scores
    - Create segment profiles
    - Generate recommendations
format:
  structure: analysis_report
  include: [segment_profiles, characteristics, recommendations]
  visualizations: [segment_distribution, value_matrix]
  export: [csv_data, pdf_report]
```

---

## 9. ✅ SYNTAX VALIDATION

### Pre-Delivery Checklist

| Check                          | Required | Action if Failed         |
| ------------------------------ | -------- | ------------------------ |
| Valid YAML syntax              | Yes      | Regenerate               |
| Consistent 2-space indentation | Yes      | Fix indentation          |
| No tab characters              | Yes      | Replace with spaces      |
| No markdown formatting         | Yes      | Remove \*\*, ###, \`\`\` |
| All RCAF/CRAFT fields present  | Yes      | Add missing fields       |
| Header has `$yaml` mode        | Yes      | Add header               |
| Delivered as file              | Yes      | Create file              |

### Common Issues & Fixes

| Issue                   | Recognition       | Solution                         |
| ----------------------- | ----------------- | -------------------------------- |
| **Indentation error**   | Parse fails       | Use exactly 2 spaces per level   |
| **Tab characters**      | Parse fails       | Replace tabs with spaces         |
| **Missing colon-space** | Key without value | Ensure `key: value` format       |
| **List syntax**         | Structure errors  | Use dash-space prefix: `- item`  |
| **Duplicate keys**      | Parser warning    | Ensure unique keys at each level |
| **Trailing spaces**     | Formatting issues | Remove trailing whitespace       |

### Error Recovery Protocol

```
1. RECOGNIZE: "Output is markdown but should be YAML"
2. STOP: Do not deliver wrong format
3. ANNOUNCE: "Format error detected. Regenerating..."
4. RETRY: Generate proper YAML
5. VALIDATE: Must parse successfully
6. DELIVER: Only if valid
```

---

## 10. 💎 BEST PRACTICES

### Do's and Don'ts

| Category        | Do ✅                        | Don't ❌                               |
| --------------- | --------------------------- | ------------------------------------- |
| **Indentation** | Use 2 spaces consistently   | Mix tabs and spaces                   |
| **Nesting**     | Keep hierarchy < 4 levels   | Over-nest structures                  |
| **Keys**        | Use meaningful names        | Use special characters without quotes |
| **Lists**       | Use dash-space prefix       | Forget list syntax                    |
| **Multi-line**  | Use \| or > for text blocks | Use flow style for complex data       |
| **Delivery**    | Create downloadable file    | Deliver in chat                       |
| **Header**      | Include `$yaml` mode        | Add verbose sections                  |
| **Content**     | Only header + YAML          | Include explanations in file          |
| **Validation**  | Validate before delivery    | Skip validation                       |

### Framework Selection

| Complexity     | Framework | YAML Structure        |
| -------------- | --------- | --------------------- |
| Simple (1-3)   | RCAF      | Flat, 4 keys          |
| Medium (4-6)   | RCAF      | Nested format         |
| Complex (7-10) | CRAFT     | Multi-level hierarchy |

### Token Optimization

```yaml
# Less efficient (verbose keys)
artificial_intelligence_model_role: expert

# More efficient (concise keys)
role: expert

# Use anchors for repetition
defaults: &defaults
  format: report
  length: 1000

task_1:
  <<: *defaults
  specific: value
```

### YAML Philosophy

> "Structure with humanity. YAML bridges machine precision with human readability."

**Core Principles:**
1. Clarity through indentation - Visual hierarchy
2. Simplicity through minimalism - Less syntax overhead
3. Flexibility through structure - Nested when needed
4. Readability through spacing - Natural formatting
5. Maintainability through comments - Self-documenting

### Performance Metrics

| Metric             | Target | Average |
| ------------------ | ------ | ------- |
| Parse Success Rate | >99%   | 99.5%   |
| Token Overhead     | <7%    | 5.2%    |
| Base CLEAR Score   | >40/50 | 42/50   |
| CLEAR with DEPTH   | >45/50 | 47/50   |
| Human Readability  | High   | 9/10    |

### Command Activation

To use YAML format (per Interactive Mode):
- `$yaml` command for automatic YAML formatting
- `$y` as shorthand
- Combine with modes: `$improve $yaml` or `$refine $yaml`
