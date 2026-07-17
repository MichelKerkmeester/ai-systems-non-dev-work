---
title: "Format Guide Markdown"
description: "Markdown output structure and formatting rules for prompt deliverables."
version: "0.141"
contextType: asset
importance_tier: high
trigger_phrases:
  - "$markdown format"
  - "Markdown prompt output"
  - "standard prompt format"
  - "human-readable delivery"
---

# Prompt - Asset - Format Guide Markdown - v0.141

Formatting guide for Markdown (Standard) output structure in prompt engineering with RCAF/CRAFT frameworks, file delivery standards, syntax validation, and format-specific best practices.

---

## 1. OVERVIEW

### Purpose

Reusable Markdown format rules for exported Prompt Improver deliverables. Defines Markdown syntax specifications, structure patterns, validation rules, and file delivery standards for natural language prompt output, covering RCAF/CRAFT frameworks in Markdown format, file delivery standards, syntax validation, format conversions, advanced patterns, and best practices.

### Usage

- **Loading Condition:** ON-DEMAND.
- Load for the routed `$markdown` command or when the final prompt must be valid Markdown.

---

## 2. FORMAT RATIONALE

### Why Markdown (Standard) Format?

Markdown provides natural language prompt engineering with optimal human readability while maintaining clear structure through RCAF/CRAFT frameworks.

**Terminology:**
- **Framework** = Prompt organization method (RCAF vs CRAFT)
- **Format** = Data structure (Standard/Markdown vs JSON vs YAML)

**See Also:** YAML Format Guide, JSON Format Guide, Interactive Mode, DEPTH guide, Patterns guide

- **Readability**
  - Markdown: Natural language
  - JSON: Structured data
  - YAML: Human-friendly structure
- **Token Usage**
  - Markdown: Baseline (100%)
  - JSON: +5-10%
  - YAML: +3-7%
- **Best For**
  - Markdown: Human interaction
  - JSON: API integration
  - YAML: Configuration
- **Framework Fit**
  - Markdown: RCAF/CRAFT equal
  - JSON: RCAF preferred
  - YAML: RCAF optimal
- **Learning Curve**
  - Markdown: None
  - JSON: Medium
  - YAML: Low

---

## 3. MARKDOWN FORMAT FUNDAMENTALS

### Core Principles

1. **Clarity First:** Every word must earn its place
2. **Natural Flow:** Conversational structure
3. **Semantic Headers:** Clear section delineation
4. **Concise Expression:** Maximum clarity, minimum tokens
5. **Action-Oriented:** Focus on what needs to be done

### Basic Structure

```markdown
**Role:** [Specific expertise needed]
**Context:** [Essential background information]
**Action:** [Clear, measurable task]
**Format:** [Expected output structure]
```

### Elements for Prompts

- **Bold Headers**
  - Use Case: Section markers
  - Example: `**Role:** Data Analyst`
- **Bullet Lists**
  - Use Case: Multiple requirements
  - Example: `- Requirement 1`
- **Numbered Lists**
  - Use Case: Sequential steps
  - Example: `1. First step`
- **Inline Code**
  - Use Case: Technical terms
  - Example: `` `API endpoint` ``
- **Block Quotes**
  - Use Case: Context emphasis
  - Example: `> Important note`

---

## 4. FILE DELIVERY STANDARDS

### Delivery Methods

**Claude Desktop/IDE:** Create actual downloadable file (.md) using file creation tool
**CLI/Agent Mode:** Save to `/Export` folder with format `[###] - descriptive-filename.md`

### Mandatory Header Format

**Single-line header at TOP of every file:**
```
Mode: $[mode] | Complexity: [level] | Framework: [RCAF/CRAFT]
```

**Header Requirements:**
- Mode with $ prefix: $improve, $refine, $quick, etc.
- Complexity level: Low/Medium/High or 1-10
- Framework used: RCAF or CRAFT

### File Content Rules

| Allowed                            | Forbidden                  |
| ---------------------------------- | -------------------------- |
| Single-line header (with $ prefix) | CLEAR Evaluation breakdown |
| Enhanced prompt content            | Processing Applied section |
|                                    | Format Options section     |
|                                    | Explanations (go in CHAT)  |

### Correct vs Incorrect

**✅ CORRECT:**
```
Mode: $improve | Complexity: Medium | Framework: RCAF

**Role:** Data analyst with expertise in SaaS metrics.
**Context:** Q4 revenue data from B2B platform with 10K customers.
**Action:** Calculate MRR growth and identify top 3 revenue trends.
**Format:** Executive summary (500 words) with metrics, charts, and recommendations.
```

**❌ INCORRECT (metadata in file):**
```
Mode: $improve | Complexity: Medium | Framework: RCAF

**Role:** Data analyst

**CLEAR Evaluation:**
- Correctness: 8/10
...

**Processing Applied:**
✅ DEPTH rounds completed
```

---

## 5. RCAF MARKDOWN STRUCTURE

### Template

```markdown
**Role:** [Specific expertise definition]
**Context:** [Essential background information]
**Action:** [Clear measurable task]
**Format:** [Expected output requirements]
```

### Example: Analysis Task

```
Mode: $improve | Complexity: Medium | Framework: RCAF

**Role:** Financial analyst specializing in SaaS metrics and growth analysis.
**Context:** Q4 2024 revenue data from B2B platform with 10,000 customers, focusing on subscription trends.
**Action:** Calculate MRR growth rate, identify top 3 revenue trends, and provide actionable insights.
**Format:** Executive summary (500 words) with key metrics, trend charts, and 3-5 strategic recommendations.
```

### Field Guidelines

- **Role**
  - Required: Yes
  - Description: Expertise needed
  - Best Practices: Be specific about domain and skills
- **Context**
  - Required: Yes
  - Description: Essential background
  - Best Practices: Include constraints and scope
- **Action**
  - Required: Yes
  - Description: Task to perform
  - Best Practices: Make measurable and specific
- **Format**
  - Required: Yes
  - Description: Output structure
  - Best Practices: Define sections and length

---

## 6. CRAFT MARKDOWN STRUCTURE

### Template

```markdown
**Context:** [Comprehensive background and constraints]
**Role:** [Detailed expertise and perspective]
**Action:** [Primary task with subtasks and deliverables]
**Format:** [Detailed output specifications]
**Target:** [Success metrics and criteria]
```

### Example: Complex Analysis

```
Mode: $refine | Complexity: High | Framework: CRAFT

**Context:** E-commerce platform experiencing 15% cart abandonment rate over the last 6 months. Available data includes user session logs, transaction records, and customer surveys. Must comply with GDPR and deliver within 30 days.

**Role:** UX researcher with e-commerce specialization, applying user-centric analysis methodology using behavioral analytics and qualitative research techniques.

**Action:** Identify root causes of cart abandonment through multi-method analysis:
- Analyze user behavior patterns across abandonment stages
- Segment users by abandonment point and demographics
- Correlate quantitative findings with survey responses
- Generate prioritized recommendations

**Format:** Research report (2500 words) structured as:
- Executive summary with key findings
- Methodology overview
- Detailed findings with visualizations
- Actionable recommendations ranked by impact/effort

**Target:** Deliver insights that enable 20% reduction in abandonment rate within Q1 2025.
```

### CRAFT vs RCAF

| Use CRAFT When                      | Use RCAF When         |
| ----------------------------------- | --------------------- |
| Multiple success metrics needed     | Single clear outcome  |
| Complex multi-stakeholder scenarios | Straightforward task  |
| Detailed specifications required    | Flexibility preferred |
| Comprehensive documentation needed  | Quick clarity needed  |

---

## 7. ADVANCED MARKDOWN PATTERNS

### Multi-Step Process

```
Mode: $improve | Complexity: High | Framework: RCAF

**Role:** Project coordinator with software deployment expertise.

**Context:** Enterprise client deployment for cloud-based CRM system, 500+ users, requiring zero downtime migration.

**Action:** Execute three-phase deployment:
- **Phase 1:** Validate infrastructure, configure staging, create rollback procedures
- **Phase 2:** Migrate data, deploy components, run integration tests
- **Phase 3:** Monitor performance, gather feedback, address issues

**Format:** Status report per phase with traffic light indicators, plus comprehensive summary.
```

### Conditional Logic

```markdown
**Role:** Customer service specialist with technical troubleshooting skills.
**Context:** First-line support for software platform.

**Action:** Classify and route support tickets:
- Technical issue (error, bug, crash) → Engineering, assess severity
- Billing/payment related → Finance, high priority
- General inquiry → Support Tier 1, standard queue

**Format:** Routing decision with department, priority, and brief rationale (50 words max).
```

---

## 8. FORMAT CONVERSIONS

**Cross-format guidance:** See YAML Format Guide, JSON Format Guide, Interactive Mode

### Conversion Reference

- **Markdown**
  - To: JSON
  - Key Changes: `**Field:**` → `"field":`, add braces
- **Markdown**
  - To: YAML
  - Key Changes: `**Field:**` → `field:`, indent nested
- **JSON**
  - To: Markdown
  - Key Changes: Remove quotes/braces, add `**Field:**`
- **YAML**
  - To: Markdown
  - Key Changes: Add `**Field:**` prefix

### Example

**Markdown:**
```markdown
**Role:** Data analyst with SQL expertise.
**Context:** Sales database with 5 years of transaction data.
**Action:** Identify top performing products by region.
**Format:** Dashboard with charts and executive summary.
```

**JSON:**
```json
{
  "role": "Data analyst with SQL expertise",
  "context": "Sales database with 5 years of transaction data",
  "action": "Identify top performing products by region",
  "format": "Dashboard with charts and executive summary"
}
```

**YAML:**
```yaml
role: Data analyst with SQL expertise
context: Sales database with 5 years of transaction data
action: Identify top performing products by region
format: Dashboard with charts and executive summary
```

---

## 9. ✅ SYNTAX VALIDATION

### Pre-Delivery Checklist

- **File is downloadable (.md)**
  - Required: Yes
  - Action if Failed: Create file
- **Single-line header with $ prefix**
  - Required: Yes
  - Action if Failed: Add header
- **All framework fields present**
  - Required: Yes
  - Action if Failed: Add missing fields
- **No forbidden sections**
  - Required: Yes
  - Action if Failed: Remove/move to chat
- **Valid markdown formatting**
  - Required: Yes
  - Action if Failed: Fix syntax
- **Natural readability**
  - Required: Yes
  - Action if Failed: Simplify language

### Framework Validation

**RCAF Requirements:**
- Role: Present, specific, domain-defined
- Context: Present, sufficient detail
- Action: Present, measurable
- Format: Present, clearly defined

**CRAFT Additional:**
- Target: Present, audience clear

### Error Recovery

```
1. RECOGNIZE: Validation failure detected
2. STOP: Do not deliver invalid file
3. ANNOUNCE: "Validation error - regenerating..."
4. FIX: Address specific issue
5. VALIDATE: Re-check all requirements
6. DELIVER: Only when valid
```

---

## 10. BEST PRACTICES

### Do's and Don'ts

- **Headers**
  - Do ✅: Use bold for fields (`**Field:**`)
  - Don't ❌: Over-format with complex markdown
- **Structure**
  - Do ✅: Keep paragraphs concise
  - Don't ❌: Skip framework fields
- **Lists**
  - Do ✅: Use for multiple items
  - Don't ❌: Nest lists excessively
- **Content**
  - Do ✅: Include specific examples
  - Don't ❌: Use ambiguous language
- **Outcomes**
  - Do ✅: Define measurable actions
  - Don't ❌: Create unmeasurable actions
- **Delivery**
  - Do ✅: Create downloadable file
  - Don't ❌: Deliver in chat
- **Header**
  - Do ✅: Use $ prefix in mode
  - Don't ❌: Add quality scores to header
- **File**
  - Do ✅: Only header + prompt content
  - Don't ❌: Include CLEAR evaluation

### Token Efficiency

```markdown

# Less efficient (verbose)
**Role:** You are a professional data analyst who specializes in...

# More efficient (concise)
**Role:** Data analyst specializing in...

# Specific terms over vague
**Context:** Dataset with 50K records (not "large dataset with lots of data")
```

### Format Selection

- **Audience**
  - Choose Markdown: Humans
  - Choose JSON: Machines/APIs
  - Choose YAML: Configurations
- **Complexity**
  - Choose Markdown: Any level
  - Choose JSON: Structured only
  - Choose YAML: Hierarchical
- **Flexibility**
  - Choose Markdown: High
  - Choose JSON: Low
  - Choose YAML: Medium
- **Readability**
  - Choose Markdown: Excellent
  - Choose JSON: Fair
  - Choose YAML: Good
- **Token Efficiency**
  - Choose Markdown: Best
  - Choose JSON: Lower
  - Choose YAML: Medium

### Markdown Philosophy

> "Natural language is the universal interface. Markdown provides structure without sacrificing humanity."

**Core Principles:**
1. Clarity through simplicity - Direct communication
2. Structure through convention - Consistent patterns
3. Flexibility through natural language - Adaptable expression
4. Efficiency through minimalism - No wasted tokens
5. Focus through minimalism - Minimal header only

### Quality Checklist

**Excellent Markdown File:**
- ✅ Valid Markdown syntax
- ✅ Single-line header with $ prefix
- ✅ All framework fields present (RCAF/CRAFT)
- ✅ Clear role definition
- ✅ Complete context
- ✅ Specific, measurable action
- ✅ Well-defined format requirements
- ✅ Delivered as downloadable file
- ✅ No metadata sections in file
- ✅ Natural readability
