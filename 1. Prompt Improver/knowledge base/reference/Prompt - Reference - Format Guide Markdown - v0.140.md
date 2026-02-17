<!-- ANCHOR:prompt-reference-format-guide-markdown-v0-140 -->
# Prompt - Reference - Format Guide Markdown - v0.140

Formatting guide for Markdown (Standard) output structure in prompt engineering with RCAF/CRAFT frameworks, file delivery standards, syntax validation, and format-specific best practices.

**Loading Condition:** ON-DEMAND
**Purpose:** Defines Markdown syntax specifications, structure patterns, validation rules, and file delivery standards for natural language prompt output.
**Scope:** RCAF/CRAFT frameworks in Markdown format, file delivery standards, syntax validation, format conversions, advanced patterns, best practices.

<!-- /ANCHOR:prompt-reference-format-guide-markdown-v0-140 -->
<!-- ANCHOR:table-of-contents -->
## TABLE OF CONTENTS

  - 1. 🎯 OVERVIEW & PURPOSE
  - 2. 📐 MARKDOWN FORMAT FUNDAMENTALS
  - 3. 📦 FILE DELIVERY STANDARDS
  - 4. 🏗️ RCAF MARKDOWN STRUCTURE
  - 5. 🔧 CRAFT MARKDOWN STRUCTURE
  - 6. 🧠 ADVANCED MARKDOWN PATTERNS
  - 7. 🔄 FORMAT CONVERSIONS
  - 8. ✅ SYNTAX VALIDATION
  - 9. 💎 BEST PRACTICES

---

<!-- /ANCHOR:table-of-contents -->
<!-- ANCHOR:1-overview-and-purpose -->
## 1. 🎯 OVERVIEW & PURPOSE

<!-- /ANCHOR:1-overview-and-purpose -->
<!-- ANCHOR:why-markdown-standard-format -->
### Why Markdown (Standard) Format?

Markdown provides natural language prompt engineering with optimal human readability while maintaining clear structure through RCAF/CRAFT frameworks.

**Terminology:**
- **Framework** = Prompt organization method (RCAF vs CRAFT)
- **Format** = Data structure (Standard/Markdown vs JSON vs YAML)

**See Also:** YAML Format Guide, JSON Format Guide, Interactive Mode, DEPTH guide, Patterns guide

| Aspect             | Markdown          | JSON            | YAML                     |
| ------------------ | ----------------- | --------------- | ------------------------ |
| **Readability**    | Natural language  | Structured data | Human-friendly structure |
| **Token Usage**    | Baseline (100%)   | +5-10%          | +3-7%                    |
| **Best For**       | Human interaction | API integration | Configuration            |
| **Framework Fit**  | RCAF/CRAFT equal  | RCAF preferred  | RCAF optimal             |
| **Learning Curve** | None              | Medium          | Low                      |

---

<!-- /ANCHOR:why-markdown-standard-format -->
<!-- ANCHOR:2-markdown-format-fundamentals -->
## 2. 📐 MARKDOWN FORMAT FUNDAMENTALS

<!-- /ANCHOR:2-markdown-format-fundamentals -->
<!-- ANCHOR:core-principles -->
### Core Principles

1. **Clarity First:** Every word must earn its place
2. **Natural Flow:** Conversational structure
3. **Semantic Headers:** Clear section delineation
4. **Concise Expression:** Maximum clarity, minimum tokens
5. **Action-Oriented:** Focus on what needs to be done

<!-- /ANCHOR:core-principles -->
<!-- ANCHOR:basic-structure -->
### Basic Structure

```markdown
**Role:** [Specific expertise needed]
**Context:** [Essential background information]
**Action:** [Clear, measurable task]
**Format:** [Expected output structure]
```

<!-- /ANCHOR:basic-structure -->
<!-- ANCHOR:elements-for-prompts -->
### Elements for Prompts

| Element            | Use Case              | Example                  |
| ------------------ | --------------------- | ------------------------ |
| **Bold Headers**   | Section markers       | `**Role:** Data Analyst` |
| **Bullet Lists**   | Multiple requirements | `- Requirement 1`        |
| **Numbered Lists** | Sequential steps      | `1. First step`          |
| **Inline Code**    | Technical terms       | `` `API endpoint` ``     |
| **Block Quotes**   | Context emphasis      | `> Important note`       |

---

<!-- /ANCHOR:elements-for-prompts -->
<!-- ANCHOR:3-file-delivery-standards -->
## 3. 📦 FILE DELIVERY STANDARDS

<!-- /ANCHOR:3-file-delivery-standards -->
<!-- ANCHOR:delivery-methods -->
### Delivery Methods

**Claude Desktop/IDE:** Create actual downloadable file (.md) using file creation tool
**CLI/Agent Mode:** Save to `/Export` folder with format `[###] - descriptive-filename.md`

<!-- /ANCHOR:delivery-methods -->
<!-- ANCHOR:mandatory-header-format -->
### Mandatory Header Format

**Single-line header at TOP of every file:**
```
Mode: $[mode] | Complexity: [level] | Framework: [RCAF/CRAFT]
```

**Header Requirements:**
- Mode with $ prefix: $improve, $refine, $quick, etc.
- Complexity level: Low/Medium/High or 1-10
- Framework used: RCAF or CRAFT

<!-- /ANCHOR:mandatory-header-format -->
<!-- ANCHOR:file-content-rules -->
### File Content Rules

| Allowed                            | Forbidden                  |
| ---------------------------------- | -------------------------- |
| Single-line header (with $ prefix) | CLEAR Evaluation breakdown |
| Enhanced prompt content            | Processing Applied section |
|                                    | Format Options section     |
|                                    | Explanations (go in CHAT)  |

<!-- /ANCHOR:file-content-rules -->
<!-- ANCHOR:correct-vs-incorrect -->
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

<!-- /ANCHOR:correct-vs-incorrect -->
<!-- ANCHOR:4-rcaf-markdown-structure -->
## 4. 🏗️ RCAF MARKDOWN STRUCTURE

<!-- /ANCHOR:4-rcaf-markdown-structure -->
<!-- ANCHOR:template -->
### Template

```markdown
**Role:** [Specific expertise definition]
**Context:** [Essential background information]
**Action:** [Clear measurable task]
**Format:** [Expected output requirements]
```

<!-- /ANCHOR:template -->
<!-- ANCHOR:example-analysis-task -->
### Example: Analysis Task

```
Mode: $improve | Complexity: Medium | Framework: RCAF

**Role:** Financial analyst specializing in SaaS metrics and growth analysis.
**Context:** Q4 2024 revenue data from B2B platform with 10,000 customers, focusing on subscription trends.
**Action:** Calculate MRR growth rate, identify top 3 revenue trends, and provide actionable insights.
**Format:** Executive summary (500 words) with key metrics, trend charts, and 3-5 strategic recommendations.
```

<!-- /ANCHOR:example-analysis-task -->
<!-- ANCHOR:field-guidelines -->
### Field Guidelines

| Field       | Required | Description          | Best Practices                      |
| ----------- | -------- | -------------------- | ----------------------------------- |
| **Role**    | Yes      | Expertise needed     | Be specific about domain and skills |
| **Context** | Yes      | Essential background | Include constraints and scope       |
| **Action**  | Yes      | Task to perform      | Make measurable and specific        |
| **Format**  | Yes      | Output structure     | Define sections and length          |

---

<!-- /ANCHOR:field-guidelines -->
<!-- ANCHOR:5-craft-markdown-structure -->
## 5. 🔧 CRAFT MARKDOWN STRUCTURE

<!-- /ANCHOR:5-craft-markdown-structure -->
<!-- ANCHOR:template-2 -->
### Template

```markdown
**Context:** [Comprehensive background and constraints]
**Role:** [Detailed expertise and perspective]
**Action:** [Primary task with subtasks and deliverables]
**Format:** [Detailed output specifications]
**Target:** [Success metrics and criteria]
```

<!-- /ANCHOR:template-2 -->
<!-- ANCHOR:example-complex-analysis -->
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

<!-- /ANCHOR:example-complex-analysis -->
<!-- ANCHOR:craft-vs-rcaf -->
### CRAFT vs RCAF

| Use CRAFT When                      | Use RCAF When         |
| ----------------------------------- | --------------------- |
| Multiple success metrics needed     | Single clear outcome  |
| Complex multi-stakeholder scenarios | Straightforward task  |
| Detailed specifications required    | Flexibility preferred |
| Comprehensive documentation needed  | Quick clarity needed  |

---

<!-- /ANCHOR:craft-vs-rcaf -->
<!-- ANCHOR:6-advanced-markdown-patterns -->
## 6. 🧠 ADVANCED MARKDOWN PATTERNS

<!-- /ANCHOR:6-advanced-markdown-patterns -->
<!-- ANCHOR:multi-step-process -->
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

<!-- /ANCHOR:multi-step-process -->
<!-- ANCHOR:conditional-logic -->
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

<!-- /ANCHOR:conditional-logic -->
<!-- ANCHOR:7-format-conversions -->
## 7. 🔄 FORMAT CONVERSIONS

**Cross-format guidance:** See YAML Format Guide, JSON Format Guide, Interactive Mode

<!-- /ANCHOR:7-format-conversions -->
<!-- ANCHOR:conversion-reference -->
### Conversion Reference

| From         | To       | Key Changes                            |
| ------------ | -------- | -------------------------------------- |
| **Markdown** | JSON     | `**Field:**` → `"field":`, add braces  |
| **Markdown** | YAML     | `**Field:**` → `field:`, indent nested |
| **JSON**     | Markdown | Remove quotes/braces, add `**Field:**` |
| **YAML**     | Markdown | Add `**Field:**` prefix                |

<!-- /ANCHOR:conversion-reference -->
<!-- ANCHOR:example -->
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

<!-- /ANCHOR:example -->
<!-- ANCHOR:8-syntax-validation -->
## 8. ✅ SYNTAX VALIDATION

<!-- /ANCHOR:8-syntax-validation -->
<!-- ANCHOR:pre-delivery-checklist -->
### Pre-Delivery Checklist

| Check                            | Required | Action if Failed    |
| -------------------------------- | -------- | ------------------- |
| File is downloadable (.md)       | Yes      | Create file         |
| Single-line header with $ prefix | Yes      | Add header          |
| All framework fields present     | Yes      | Add missing fields  |
| No forbidden sections            | Yes      | Remove/move to chat |
| Valid markdown formatting        | Yes      | Fix syntax          |
| Natural readability              | Yes      | Simplify language   |

<!-- /ANCHOR:pre-delivery-checklist -->
<!-- ANCHOR:framework-validation -->
### Framework Validation

**RCAF Requirements:**
- Role: Present, specific, domain-defined
- Context: Present, sufficient detail
- Action: Present, measurable
- Format: Present, clearly defined

**CRAFT Additional:**
- Target: Present, audience clear

<!-- /ANCHOR:framework-validation -->
<!-- ANCHOR:error-recovery -->
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

<!-- /ANCHOR:error-recovery -->
<!-- ANCHOR:9-best-practices -->
## 9. 💎 BEST PRACTICES

<!-- /ANCHOR:9-best-practices -->
<!-- ANCHOR:do-s-and-don-ts -->
### Do's and Don'ts

| Category      | Do ✅                               | Don't ❌                           |
| ------------- | ---------------------------------- | --------------------------------- |
| **Headers**   | Use bold for fields (`**Field:**`) | Over-format with complex markdown |
| **Structure** | Keep paragraphs concise            | Skip framework fields             |
| **Lists**     | Use for multiple items             | Nest lists excessively            |
| **Content**   | Include specific examples          | Use ambiguous language            |
| **Outcomes**  | Define measurable actions          | Create unmeasurable actions       |
| **Delivery**  | Create downloadable file           | Deliver in chat                   |
| **Header**    | Use $ prefix in mode               | Add quality scores to header      |
| **File**      | Only header + prompt content       | Include CLEAR evaluation          |

<!-- /ANCHOR:do-s-and-don-ts -->
<!-- ANCHOR:token-efficiency -->
### Token Efficiency

```markdown
# Less efficient (verbose)
**Role:** You are a professional data analyst who specializes in...

# More efficient (concise)
**Role:** Data analyst specializing in...

# Specific terms over vague
**Context:** Dataset with 50K records (not "large dataset with lots of data")
```

<!-- /ANCHOR:token-efficiency -->
<!-- ANCHOR:format-selection -->
### Format Selection

| Factor               | Choose Markdown | Choose JSON     | Choose YAML    |
| -------------------- | --------------- | --------------- | -------------- |
| **Audience**         | Humans          | Machines/APIs   | Configurations |
| **Complexity**       | Any level       | Structured only | Hierarchical   |
| **Flexibility**      | High            | Low             | Medium         |
| **Readability**      | Excellent       | Fair            | Good           |
| **Token Efficiency** | Best            | Lower           | Medium         |

<!-- /ANCHOR:format-selection -->
<!-- ANCHOR:markdown-philosophy -->
### Markdown Philosophy

> "Natural language is the universal interface. Markdown provides structure without sacrificing humanity."

**Core Principles:**
1. Clarity through simplicity - Direct communication
2. Structure through convention - Consistent patterns
3. Flexibility through natural language - Adaptable expression
4. Efficiency through minimalism - No wasted tokens
5. Focus through minimalism - Minimal header only

<!-- /ANCHOR:markdown-philosophy -->
<!-- ANCHOR:quality-checklist -->
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
<!-- /ANCHOR:quality-checklist -->
