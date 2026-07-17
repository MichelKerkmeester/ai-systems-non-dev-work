---
title: "Format Guide JSON"
description: "JSON output structure, schema guidance and syntax rules for prompt deliverables."
version: "0.141"
contextType: asset
importance_tier: high
trigger_phrases:
  - "$json format"
  - "JSON prompt output"
  - "API-ready prompt"
  - "valid JSON delivery"
---

# Prompt - Asset - Format Guide JSON - v0.141

Formatting guide for JSON output structure in prompt engineering with RCAF/CRAFT frameworks, file delivery standards, syntax validation, and format-specific best practices.

---

## 1. OVERVIEW

### Purpose

Reusable JSON format rules for exported Prompt Improver deliverables. Defines JSON syntax specifications, structure patterns, validation rules, and file delivery standards for prompt engineering output, covering JSON fundamentals, RCAF/CRAFT JSON structures, file delivery standards, syntax validation, format conversions, advanced patterns, and best practices.

### Usage

- **Loading Condition:** ON-DEMAND.
- Load for the routed `$json` command or when the final prompt must be valid JSON.

---

## 2. FORMAT RATIONALE

### Why JSON Format?

JSON provides structured, machine-parseable prompt engineering with consistent field access and programmatic integration capabilities.

**JSON Format Benefits:**
- **Structured Data:** Clear field separation and hierarchy
- **API Integration:** Direct compatibility with systems
- **Consistent Parsing:** Reliable field extraction
- **Type Safety:** Explicit data types
- **Validation:** Schema-based verification

- **Readability**
  - Markdown: Natural language
  - JSON: Structured data
  - YAML: Human-friendly structure
- **Token Usage**
  - Markdown: Baseline
  - JSON: +5-10%
  - YAML: +3-7%
- **Best For**
  - Markdown: Human interaction
  - JSON: API/System integration
  - YAML: Configuration
- **Framework Fit**
  - Markdown: RCAF/CRAFT
  - JSON: RCAF preferred
  - YAML: RCAF optimal

---

## 3. JSON FORMAT FUNDAMENTALS

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

- **String**
  - Use Case: Text values
  - Example: `"role": "Data Analyst"`
- **Number**
  - Use Case: Quantities
  - Example: `"limit": 100`
- **Boolean**
  - Use Case: Flags
  - Example: `"detailed": true`
- **Array**
  - Use Case: Lists
  - Example: `"skills": ["Python", "SQL"]`
- **Object**
  - Use Case: Nested structure
  - Example: `"format": {"type": "report"}`

---

## 4. FILE DELIVERY STANDARDS

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

- **✅ CORRECT**
  - Example: `{ "role": "Data analyst", "context": "..." }`
  - Problem: Pure JSON in file
- **❌ WRONG**
  - Example: `**Role:** Data analyst`
  - Problem: Markdown, not JSON
- **❌ WRONG**
  - Example: `Here's the JSON:` followed by code block
  - Problem: Explanatory text in file
- **❌ WRONG**
  - Example: Inline code in chat
  - Problem: Not delivered as file

---

## 5. RCAF JSON STRUCTURE

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

- **role**
  - Required: Yes
  - Description: Expertise needed
  - Purpose: Defines AI's perspective and domain
- **context**
  - Required: Yes
  - Description: Essential info
  - Purpose: Provides situation and constraints
- **action**
  - Required: Yes
  - Description: Specific task
  - Purpose: Specifies what AI should do
- **format**
  - Required: Yes
  - Description: Output structure
  - Purpose: Defines how results are organized

---

## 6. CRAFT JSON STRUCTURE

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

## 7. ADVANCED JSON PATTERNS

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

## 8. FORMAT CONVERSIONS

**Cross-format guidance:** See Markdown Format Guide, YAML Format Guide, Interactive Mode

### Conversion Reference

- **Markdown**
  - To: JSON
  - Key Changes: `**Field:**` → `"field":`, add braces/quotes
- **JSON**
  - To: Markdown
  - Key Changes: Remove braces/quotes, add `**Field:**`
- **JSON**
  - To: YAML
  - Key Changes: Remove braces/quotes, use indentation
- **YAML**
  - To: JSON
  - Key Changes: Add braces/quotes, commas

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

## 9. ✅ SYNTAX VALIDATION

### Pre-Delivery Checklist

- **Valid JSON syntax (parseable)**
  - Required: Yes
  - Action if Failed: Regenerate
- **No markdown formatting**
  - Required: Yes
  - Action if Failed: Remove \*\*, ###, \`\`\`
- **All RCAF/CRAFT fields present**
  - Required: Yes
  - Action if Failed: Add missing fields
- **Header has `$json` mode**
  - Required: Yes
  - Action if Failed: Add header
- **Delivered as file**
  - Required: Yes
  - Action if Failed: Create file
- **Consistent data types**
  - Required: Yes
  - Action if Failed: Fix types
- **No trailing commas**
  - Required: Yes
  - Action if Failed: Remove commas
- **Double quotes only**
  - Required: Yes
  - Action if Failed: Replace single quotes

### Common Issues & Fixes

- **Invalid JSON**
  - Recognition: Parse errors
  - Solution: Validate with JSON linter
- **Format violation**
  - Recognition: Markdown instead of JSON
  - Solution: Regenerate as pure JSON
- **Trailing commas**
  - Recognition: Extra comma at end
  - Solution: Remove trailing commas
- **Unquoted keys**
  - Recognition: Parse failure
  - Solution: Wrap all keys in quotes
- **Single quotes**
  - Recognition: Parse failure
  - Solution: Use double quotes only
- **Comments**
  - Recognition: Parse failure
  - Solution: Remove (JSON doesn't support)
- **Missing braces**
  - Recognition: Incomplete structure
  - Solution: Add closing brackets

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

## 10. BEST PRACTICES

### Do's and Don'ts

- **Quotes**
  - Do ✅: Use double quotes for keys/strings
  - Don't ❌: Use single quotes
- **Validation**
  - Do ✅: Validate JSON before delivery
  - Don't ❌: Skip validation
- **Nesting**
  - Do ✅: Keep shallow (< 4 levels)
  - Don't ❌: Over-nest structures
- **Naming**
  - Do ✅: Use consistent field naming
  - Don't ❌: Mix naming conventions
- **Data Types**
  - Do ✅: Use appropriate types
  - Don't ❌: Mix types inconsistently
- **Delivery**
  - Do ✅: Create downloadable file
  - Don't ❌: Deliver in chat
- **Header**
  - Do ✅: Include `$json` mode
  - Don't ❌: Add verbose sections
- **Content**
  - Do ✅: Only header + JSON
  - Don't ❌: Include markdown/explanations
- **Syntax**
  - Do ✅: Escape special characters
  - Don't ❌: Use trailing commas
- **Comments**
  - Do ✅: Remove all comments
  - Don't ❌: Include comments (invalid)

### Framework Structure

- **Simple (1-3)**
  - Framework: RCAF
  - JSON Structure: Flat structure
  - Nesting Depth: 1-2 levels
- **Medium (4-6)**
  - Framework: RCAF
  - JSON Structure: Nested format field
  - Nesting Depth: 2-3 levels
- **Complex (7-10)**
  - Framework: CRAFT
  - JSON Structure: Multi-level nesting
  - Nesting Depth: 3-4 levels

### When to Use JSON

- **API integration needed**
  - Use Markdown When: Human readability priority
  - Use YAML When: Configuration templates
- **Structured data processing**
  - Use Markdown When: Natural conversation flow
  - Use YAML When: Human editing needed
- **Programmatic generation**
  - Use Markdown When: Creative/open-ended tasks
  - Use YAML When: Complex hierarchies
- **Schema validation required**
  - Use Markdown When: Flexibility needed
  - Use YAML When: Comments helpful
- **Batch processing**
  - Use Markdown When: Single prompt usage
  - Use YAML When: Multi-line text common

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

- **Markdown**
  - Avg CLEAR: 43/50
  - Strengths: Expression (9/10), Natural flow
  - Weaknesses: Structure consistency
- **JSON**
  - Avg CLEAR: 41/50
  - Strengths: Arrangement (9/10), Precision
  - Weaknesses: Expression (7/10)
- **YAML**
  - Avg CLEAR: 42/50
  - Strengths: Balance (8/10 avg)
  - Weaknesses: Learning curve

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
