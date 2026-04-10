# Prompt - Reference - Format Guide JSON - v0.140

Formatting guide for JSON output structure in prompt engineering with RCAF/CRAFT frameworks, file delivery standards, syntax validation, and format-specific best practices.

**Loading Condition:** ON-DEMAND
**Purpose:** Define JSON syntax specifications, structure patterns, validation rules, and file delivery standards for prompt engineering output.
**Scope:** JSON format fundamentals, RCAF/CRAFT JSON structures, file delivery standards, syntax validation, format conversions, advanced patterns, and best practices.

## TABLE OF CONTENTS

  - 1. 🎯 OVERVIEW & PURPOSE
  - 2. 📐 JSON FORMAT FUNDAMENTALS
  - 3. 📦 FILE DELIVERY STANDARDS
  - 4. 🏗️ RCAF JSON STRUCTURE
  - 5. 🔧 CRAFT JSON STRUCTURE
  - 6. 🧠 ADVANCED JSON PATTERNS
  - 7. 🔄 FORMAT CONVERSIONS
  - 8. ✅ SYNTAX VALIDATION
  - 9. 💎 BEST PRACTICES

---

## 1. 🎯 OVERVIEW & PURPOSE

### Why JSON Format?

JSON provides structured, machine-parseable prompt engineering with consistent field access and programmatic integration capabilities.

**JSON Format Benefits:**
- **Structured Data:** Clear field separation and hierarchy
- **API Integration:** Direct compatibility with systems
- **Consistent Parsing:** Reliable field extraction
- **Type Safety:** Explicit data types
- **Validation:** Schema-based verification

| Aspect            | Markdown          | JSON                   | YAML                     |
| ----------------- | ----------------- | ---------------------- | ------------------------ |
| **Readability**   | Natural language  | Structured data        | Human-friendly structure |
| **Token Usage**   | Baseline          | +5-10%                 | +3-7%                    |
| **Best For**      | Human interaction | API/System integration | Configuration            |
| **Framework Fit** | RCAF/CRAFT        | RCAF preferred         | RCAF optimal             |

---

## 2. 📐 JSON FORMAT FUNDAMENTALS

### Core Principles

1. **Structure Over Prose:** Fields replace sentences
2. **Explicit Types:** Clear data type definitions
3. **Hierarchical Organization:** Nested structures for complexity
4. **Schema Consistency:** Predictable field patterns
5. **Minimal Redundancy:** No repeated information

### Basic Structure

```json
{
  "instruction": "Primary directive",
  "context": "Essential information",
  "parameters": {
    "key1": "value1",
    "key2": "value2"
  },
  "output": {
    "format": "desired structure",
    "constraints": ["constraint1", "constraint2"]
  }
}
```

### Data Types

| Type        | Use Case         | Example                        |
| ----------- | ---------------- | ------------------------------ |
| **String**  | Text values      | `"role": "Data Analyst"`       |
| **Number**  | Quantities       | `"limit": 100`                 |
| **Boolean** | Flags            | `"detailed": true`             |
| **Array**   | Lists            | `"skills": ["Python", "SQL"]`  |
| **Object**  | Nested structure | `"format": {"type": "report"}` |

---

## 3. 📦 FILE DELIVERY STANDARDS

### Mandatory Requirements

**Core Rule:** Every enhancement MUST be delivered as a downloadable file (.json), NEVER inline or in chat.

**Delivery Methods:**
1. **Claude Desktop/IDE:** Create actual downloadable file using file creation tool
2. **CLI/Agent Mode:** Use `/Export` folder with format `[###] - descriptive-filename.json`

### Mandatory Header Format

**Single-line header at TOP of every JSON file:**
```
Mode: $json | Complexity: [level] | Framework: [RCAF/CRAFT]
```

### File Content Rules

| Allowed                            | Forbidden                               |
| ---------------------------------- | --------------------------------------- |
| Single-line header (with $ prefix) | Format Options section                  |
| JSON prompt content                | CLEAR Evaluation breakdown              |
|                                    | Processing Applied section              |
|                                    | Explanations (go in CHAT)               |
|                                    | Markdown formatting (\*\*, ###, \`\`\`) |
|                                    | Comments (JSON doesn't support)         |
|                                    | Inline/chat delivery                    |

### Format Lock Protocol

```
DETECTION: $json command identified
    ↓
LOCK: JSON-only output mode, .json file type
    ↓
GENERATE: Pure JSON structure
    ↓
VALIDATE: Is it valid JSON?
    ↓
If NO → STOP → REGENERATE
If YES → DELIVER as file
```

### Correct vs Incorrect

| Status        | Example                                        | Problem                  |
| ------------- | ---------------------------------------------- | ------------------------ |
| **✅ CORRECT** | `{ "role": "Data analyst", "context": "..." }` | Pure JSON in file        |
| **❌ WRONG**   | `**Role:** Data analyst`                       | Markdown, not JSON       |
| **❌ WRONG**   | `Here's the JSON:` followed by code block      | Explanatory text in file |
| **❌ WRONG**   | Inline code in chat                            | Not delivered as file    |

---

## 4. 🏗️ RCAF JSON STRUCTURE

### Template

```json
{
  "role": "Specific expertise definition",
  "context": "Essential background information",
  "action": "Clear measurable task",
  "format": {
    "structure": "output type",
    "requirements": ["req1", "req2"],
    "constraints": ["limit1", "limit2"]
  }
}
```

### Example: Analysis Task

```
Mode: $json | Complexity: Medium | Framework: RCAF

{
  "role": "Financial analyst specializing in SaaS metrics",
  "context": "Q4 2024 revenue data from B2B platform with 10K customers",
  "action": "Calculate MRR growth and identify top 3 trends",
  "format": {
    "structure": "executive_summary",
    "length": "500_words",
    "include": ["metrics", "charts", "recommendations"]
  }
}
```

### Field Guidelines

| Field       | Required | Description      | Purpose                             |
| ----------- | -------- | ---------------- | ----------------------------------- |
| **role**    | Yes      | Expertise needed | Defines AI's perspective and domain |
| **context** | Yes      | Essential info   | Provides situation and constraints  |
| **action**  | Yes      | Specific task    | Specifies what AI should do         |
| **format**  | Yes      | Output structure | Defines how results are organized   |

---

## 5. 🔧 CRAFT JSON STRUCTURE

### Template

```json
{
  "context": {
    "background": "Full situation details",
    "constraints": ["constraint1", "constraint2"]
  },
  "role": {
    "expertise": "Detailed expertise",
    "perspective": "Specific viewpoint"
  },
  "action": {
    "primary": "Main task",
    "subtasks": ["task1", "task2"],
    "deliverables": ["deliverable1"]
  },
  "format": {
    "structure": "Output organization",
    "specifications": {
      "length": "word_count",
      "style": "tone"
    }
  },
  "target": {
    "metrics": ["metric1", "metric2"],
    "success_criteria": "Definition of success"
  }
}
```

### Example: Complex Analysis

```
Mode: $json | Complexity: High | Framework: CRAFT

{
  "context": {
    "background": "E-commerce platform experiencing 15% cart abandonment",
    "timeframe": "Last 6 months",
    "data_available": ["user_sessions", "transaction_logs", "surveys"],
    "constraints": ["GDPR compliance", "30-day deadline"]
  },
  "role": {
    "expertise": "UX researcher with e-commerce specialization",
    "perspective": "User-centric analysis"
  },
  "action": {
    "primary": "Identify cart abandonment root causes",
    "subtasks": [
      "Analyze user behavior patterns",
      "Segment users by abandonment stage",
      "Correlate with survey responses"
    ]
  },
  "format": {
    "structure": "research_report",
    "specifications": {
      "length": "2500_words",
      "visualizations": ["flow_diagrams", "heat_maps"],
      "sections": ["executive_summary", "methodology", "findings", "recommendations"]
    }
  },
  "target": {
    "metrics": ["abandonment_rate_reduction", "conversion_improvement"],
    "success_criteria": "Actionable insights reducing abandonment by 20%"
  }
}
```

---

## 6. 🧠 ADVANCED JSON PATTERNS

### Multi-Step Process

```json
{
  "role": "Project coordinator",
  "context": "Software deployment for enterprise client",
  "action": {
    "phase_1": {
      "task": "Environment preparation",
      "outputs": ["checklist", "validation_report"]
    },
    "phase_2": {
      "task": "Deployment execution",
      "outputs": ["deployment_log", "test_results"]
    },
    "phase_3": {
      "task": "Post-deployment validation",
      "outputs": ["performance_metrics", "user_feedback"]
    }
  },
  "format": {
    "per_phase": "status_report",
    "final": "comprehensive_summary"
  }
}
```

### Conditional Logic

```json
{
  "role": "Customer service AI",
  "context": "Support ticket classification system",
  "action": "Route tickets based on criteria",
  "logic": {
    "if_technical": { "route_to": "engineering", "priority": "assess_severity" },
    "if_billing": { "route_to": "finance", "priority": "high" },
    "if_general": { "route_to": "support_tier_1", "priority": "standard" }
  },
  "format": {
    "response": "routing_decision",
    "include": ["department", "priority", "rationale"]
  }
}
```

### Parameterized Template

```json
{
  "template": "data_analysis",
  "parameters": {
    "dataset": "${DATASET_NAME}",
    "metrics": "${METRICS_ARRAY}",
    "timeframe": "${TIME_PERIOD}"
  },
  "role": "Data analyst",
  "context": "Business intelligence reporting",
  "action": "Generate insights from ${DATASET_NAME}",
  "format": {
    "structure": "dashboard",
    "charts": ["${CHART_TYPES}"]
  }
}
```

---

## 7. 🔄 FORMAT CONVERSIONS

**Cross-format guidance:** See Markdown Format Guide, YAML Format Guide, Interactive Mode

### Conversion Reference

| From         | To       | Key Changes                                  |
| ------------ | -------- | -------------------------------------------- |
| **Markdown** | JSON     | `**Field:**` → `"field":`, add braces/quotes |
| **JSON**     | Markdown | Remove braces/quotes, add `**Field:**`       |
| **JSON**     | YAML     | Remove braces/quotes, use indentation        |
| **YAML**     | JSON     | Add braces/quotes, commas                    |

### Example

**Markdown:**
```markdown
**Role:** Data analyst with SQL expertise.
**Action:** Identify top performing products.
```

**JSON:**
```json
{
  "role": "Data analyst with SQL expertise",
  "action": "Identify top performing products"
}
```

---

## 8. ✅ SYNTAX VALIDATION

### Pre-Delivery Checklist

| Check                         | Required | Action if Failed         |
| ----------------------------- | -------- | ------------------------ |
| Valid JSON syntax (parseable) | Yes      | Regenerate               |
| No markdown formatting        | Yes      | Remove \*\*, ###, \`\`\` |
| All RCAF/CRAFT fields present | Yes      | Add missing fields       |
| Header has `$json` mode       | Yes      | Add header               |
| Delivered as file             | Yes      | Create file              |
| Consistent data types         | Yes      | Fix types                |
| No trailing commas            | Yes      | Remove commas            |
| Double quotes only            | Yes      | Replace single quotes    |

### Common Issues & Fixes

| Issue                | Recognition              | Solution                      |
| -------------------- | ------------------------ | ----------------------------- |
| **Invalid JSON**     | Parse errors             | Validate with JSON linter     |
| **Format violation** | Markdown instead of JSON | Regenerate as pure JSON       |
| **Trailing commas**  | Extra comma at end       | Remove trailing commas        |
| **Unquoted keys**    | Parse failure            | Wrap all keys in quotes       |
| **Single quotes**    | Parse failure            | Use double quotes only        |
| **Comments**         | Parse failure            | Remove (JSON doesn't support) |
| **Missing braces**   | Incomplete structure     | Add closing brackets          |

### Error Recovery

```
1. RECOGNIZE: "Is output markdown instead of JSON?"
2. STOP: Halt delivery
3. ANNOUNCE: "Format error detected. Regenerating..."
4. RETRY: Generate proper JSON
5. VALIDATE: JSON parser must succeed
6. DELIVER: Create downloadable file
```

---

## 9. 💎 BEST PRACTICES

### Do's and Don'ts

| Category       | Do ✅                               | Don't ❌                       |
| -------------- | ---------------------------------- | ----------------------------- |
| **Quotes**     | Use double quotes for keys/strings | Use single quotes             |
| **Validation** | Validate JSON before delivery      | Skip validation               |
| **Nesting**    | Keep shallow (< 4 levels)          | Over-nest structures          |
| **Naming**     | Use consistent field naming        | Mix naming conventions        |
| **Data Types** | Use appropriate types              | Mix types inconsistently      |
| **Delivery**   | Create downloadable file           | Deliver in chat               |
| **Header**     | Include `$json` mode               | Add verbose sections          |
| **Content**    | Only header + JSON                 | Include markdown/explanations |
| **Syntax**     | Escape special characters          | Use trailing commas           |
| **Comments**   | Remove all comments                | Include comments (invalid)    |

### Framework Structure

| Complexity     | Framework | JSON Structure      | Nesting Depth |
| -------------- | --------- | ------------------- | ------------- |
| Simple (1-3)   | RCAF      | Flat structure      | 1-2 levels    |
| Medium (4-6)   | RCAF      | Nested format field | 2-3 levels    |
| Complex (7-10) | CRAFT     | Multi-level nesting | 3-4 levels    |

### When to Use JSON

| Use JSON When              | Use Markdown When          | Use YAML When           |
| -------------------------- | -------------------------- | ----------------------- |
| API integration needed     | Human readability priority | Configuration templates |
| Structured data processing | Natural conversation flow  | Human editing needed    |
| Programmatic generation    | Creative/open-ended tasks  | Complex hierarchies     |
| Schema validation required | Flexibility needed         | Comments helpful        |
| Batch processing           | Single prompt usage        | Multi-line text common  |

### Token Optimization

```json
// Less efficient (verbose keys)
{ "artificial_intelligence_model_role": "expert" }

// More efficient (concise keys)
{ "role": "expert" }
```

### JSON Philosophy

> "Structure enables consistency. Consistency enables automation. Automation enables scale."

**Core Principles:**
1. Clarity through structure - Clear field separation
2. Precision through types - Explicit data types
3. Reusability through templates - Parameterized patterns
4. Integration through standards - API compatibility
5. Quality through validation - Syntax enforcement

### CLEAR Score Impact

| Format       | Avg CLEAR | Strengths                       | Weaknesses            |
| ------------ | --------- | ------------------------------- | --------------------- |
| **Markdown** | 43/50     | Expression (9/10), Natural flow | Structure consistency |
| **JSON**     | 41/50     | Arrangement (9/10), Precision   | Expression (7/10)     |
| **YAML**     | 42/50     | Balance (8/10 avg)              | Learning curve        |

### Quality Checklist

**Excellent JSON Format:**
- ✅ Valid JSON syntax (parseable)
- ✅ All framework fields present
- ✅ Consistent data types
- ✅ Shallow nesting (< 4 levels)
- ✅ No syntax errors
- ✅ Delivered as downloadable file
- ✅ Single-line header with $json
- ✅ Clean structure (no markdown)
- ✅ Proper escaping
- ✅ API-ready format
