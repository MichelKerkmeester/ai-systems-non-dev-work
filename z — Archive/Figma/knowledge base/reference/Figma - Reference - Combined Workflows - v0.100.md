
# Figma - Reference - Combined Workflows - v0.100

Reference patterns combining Figma MCP tools through Code Mode for complex design-system workflows, cross-tool integrations, and error recovery.

**Loading Condition:** ON-DEMAND
**Purpose:** Native MCP patterns for auditing design systems, exporting tokens, bulk image export, review automation, component documentation, inventory, and cross-tool integrations.
**Scope:** Six core workflow patterns plus cross-tool integration, error recovery, best practices, decision guidance, and quick reference.

---

## 1. OVERVIEW

### Purpose

Ready-to-use workflow patterns for the **Figma MCP Agent** persona. The agent is **not a designer**, **not a developer**, and **not a manual API wrapper**. It is a native MCP operator that reads Figma files, exports assets, extracts components and styles, summarizes collaboration signals, and hands structured outputs to other MCP systems.

### Core Principle

**Use Figma MCP for design truth; use cross-MCP chains for operational handoff.**

```yaml
tool_selection_heuristic:
  figma_mcp_best_for:
    - "File structure reads and page/frame discovery"
    - "Specific node retrieval"
    - "Component and style inventories"
    - "PNG, JPG, SVG, and PDF exports"
    - "Comment review and automated feedback"
    - "Team project and library navigation"

  cross_mcp_best_for:
    - "Figma components -> ClickUp implementation tasks"
    - "Figma exports -> Webflow CMS assets"
    - "Figma comments -> Notion review notes"
    - "Figma tokens -> code-generation handoff"
    - "Figma inventory -> team documentation"

  combined_pattern:
    - "Survey with file/project tools"
    - "Yield structured findings"
    - "Navigate to the exact nodes, components, comments, or styles"
    - "Create downstream artifacts in ClickUp, Webflow, Notion, or code"
```

### SYNC Framework Fit

```yaml
sync_framework:
  Survey:
    purpose: "Find the design surface, team library, file pages, components, styles, comments, or export nodes."
    tools: ["figma_get_file", "figma_get_team_projects", "figma_get_project_files"]

  Yield:
    purpose: "Transform raw MCP results into normalized tables, reports, token maps, or export manifests."
    tools: ["figma_get_file_components", "figma_get_file_styles", "figma_get_comments"]

  Navigate:
    purpose: "Move from broad discovery to exact component keys, style keys, node IDs, or project files."
    tools: ["figma_get_file_nodes", "figma_get_component", "figma_get_style"]

  Create:
    purpose: "Create reports, tasks, CMS items, comments, markdown tables, token JSON, or code handoff packages."
    tools: ["figma_get_image", "figma_post_comment", "external MCP tools"]
```

## 2. AUDIT A DESIGN SYSTEM

### Full Design-System Audit Pipeline

```yaml
workflow:
  intent: "Audit a design system"
  sync_fit:
    Survey: "Read file structure and team library scope"
    Yield: "Count components, styles, and gaps"
    Navigate: "Inspect representative components and style records"
    Create: "Create an audit report with risks and follow-up actions"

  required_tools:
    - "figma_get_file_components"
    - "figma_get_file_styles"
    - "figma_get_team_components"

  optional_tools:
    - "figma_get_file"
    - "figma_get_component"
    - "figma_get_team_component_sets"
```

### Preconditions

| Requirement | Details |
|---|---|
| **File key** | Design-system file key from the Figma URL |
| **Team ID** | Required for team-wide component inventory |
| **Access** | Figma account or API key can read the file and team library |
| **Scope rule** | Audit metadata first; fetch specific components only when needed |

### Tool Sequence

```typescript
call_tool_chain({
  code: `
    const fileKey = "design_system_file_key";
    const teamId = "figma_team_id";

    const [fileComponents, fileStyles, teamComponents] = await Promise.all([
      figma.figma_get_file_components({ fileKey }),
      figma.figma_get_file_styles({ fileKey }),
      figma.figma_get_team_components({
        team_id: teamId,
        page_size: 30
      })
    ]);

    const components = Object.values(fileComponents.meta.components || {});
    const styles = Object.values(fileStyles.meta.styles || {});
    const teamLibrary = teamComponents.meta?.components || teamComponents.components || [];

    const styleGroups = styles.reduce((acc, style) => {
      const type = style.style_type || "UNKNOWN";
      acc[type] = acc[type] || [];
      acc[type].push(style);
      return acc;
    }, {});

    const unnamedComponents = components.filter(component =>
      !component.name || /^Component\\s*\\d*$/i.test(component.name)
    );

    const audit = {
      fileComponents: components.length,
      teamComponents: Array.isArray(teamLibrary) ? teamLibrary.length : Object.keys(teamLibrary).length,
      stylesByType: Object.fromEntries(
        Object.entries(styleGroups).map(([type, list]) => [type, list.length])
      ),
      namingRisks: unnamedComponents.map(component => ({
        name: component.name,
        key: component.key,
        node_id: component.node_id
      }))
    };

    console.log("Design-system audit");
    console.log(JSON.stringify(audit, null, 2));
    return audit;
  `,
  timeout: 60000
});
```

### Expected Output

| Output | Use |
|---|---|
| `fileComponents` | Count of components published or present in the file |
| `teamComponents` | Team-wide library count for comparison |
| `stylesByType` | FILL, TEXT, EFFECT, GRID coverage |
| `namingRisks` | Components needing naming cleanup before handoff |

### Common Pitfalls

| Pitfall | Fix |
|---|---|
| File components look complete but team inventory is sparse | Confirm `team_id` and published library visibility |
| `figma_get_file_nodes` fails with a component key | Use `component.node_id` for node calls and `component.key` for `figma_get_component` |
| Token audit only sees colors | Group by `style_type`, including TEXT, EFFECT, and GRID |
| Large libraries return partial inventory | Loop through `cursor` for team endpoints |

---

## 3. EXPORT DESIGN TOKENS

### File Styles → `token.json` Mapping

```yaml
workflow:
  intent: "Export design tokens"
  sync_fit:
    Survey: "Read file styles"
    Yield: "Normalize style names and group by token category"
    Navigate: "Fetch style details when metadata alone is insufficient"
    Create: "Create token.json-ready object for code generation"

  required_tools:
    - "figma_get_file_styles"

  optional_tools:
    - "figma_get_style"
    - "figma_get_file"
```

### Preconditions

| Requirement | Details |
|---|---|
| **File key** | Source design-system file |
| **Style taxonomy** | Names should encode groups such as `Color/Brand/Primary` |
| **Token consumer** | Confirm whether output target is Style Dictionary, CSS vars, Tailwind, or custom JSON |
| **Caveat** | Style metadata may need node/file inspection for exact paint values depending on provider response |

### Tool Sequence

```typescript
call_tool_chain({
  code: `
    const fileKey = "design_system_file_key";

    const styles = await figma.figma_get_file_styles({ fileKey });
    const styleList = Object.values(styles.meta.styles || {});

    function slug(input) {
      return String(input || "")
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
    }

    function tokenPath(style) {
      const parts = String(style.name || "unnamed").split("/").map(slug).filter(Boolean);
      return parts.length ? parts : ["unnamed"];
    }

    const tokenJson = {
      "$schema": "https://tokens.studio/schemas/tokens.json",
      "$metadata": {
        "source": "figma",
        "fileKey": fileKey,
        "styleCount": styleList.length
      },
      "color": {},
      "typography": {},
      "effect": {},
      "grid": {}
    };

    for (const style of styleList) {
      const path = tokenPath(style);
      const leaf = path[path.length - 1];
      const base = {
        "$description": style.description || "",
        "$extensions": {
          "figma": {
            "styleKey": style.key,
            "styleType": style.style_type,
            "nodeId": style.node_id || null
          }
        }
      };

      if (style.style_type === "FILL") {
        tokenJson.color[leaf] = { ...base, "$type": "color", "$value": "{figma.lookup." + style.key + "}" };
      } else if (style.style_type === "TEXT") {
        tokenJson.typography[leaf] = { ...base, "$type": "typography", "$value": "{figma.lookup." + style.key + "}" };
      } else if (style.style_type === "EFFECT") {
        tokenJson.effect[leaf] = { ...base, "$type": "shadow", "$value": "{figma.lookup." + style.key + "}" };
      } else if (style.style_type === "GRID") {
        tokenJson.grid[leaf] = { ...base, "$type": "dimension", "$value": "{figma.lookup." + style.key + "}" };
      }
    }

    console.log(JSON.stringify(tokenJson, null, 2));
    return tokenJson;
  `
});
```

### Expected Output

```yaml
expected_output:
  format: "token.json-compatible object"
  includes:
    - "schema metadata"
    - "source file key"
    - "style keys for traceability"
    - "tokens grouped by color, typography, effect, and grid"
  handoff_targets:
    - "Style Dictionary"
    - "Tailwind config generation"
    - "CSS custom properties"
    - "component code-generation prompts"
```

### Common Pitfalls

| Pitfall | Fix |
|---|---|
| Output has style keys but not raw hex/font values | Resolve paint/text values from file nodes or a downstream resolver |
| `Color/Brand/Primary` becomes ambiguous | Preserve slash hierarchy before slugging leaves |
| Text styles emit as color tokens | Branch on `style_type`, not name prefix |
| Variable names churn between exports | Use stable slugging and keep Figma style keys in extensions |

---

## 4. BULK IMAGE EXPORT

### File + Nodes + Image Export at Scale

```yaml
workflow:
  intent: "Bulk image export"
  sync_fit:
    Survey: "Read the file and identify exportable frames/components"
    Yield: "Build export manifest"
    Navigate: "Fetch exact nodes in batches"
    Create: "Create image URL map for downstream asset ingestion"

  required_tools:
    - "figma_get_file"
    - "figma_get_file_nodes"
    - "figma_get_image"
```

### Preconditions

| Requirement | Details |
|---|---|
| **File key** | Source Figma file |
| **Node IDs** | Export target node IDs or a rule for selecting them |
| **Format** | `png`, `jpg`, `svg`, or `pdf` |
| **Rate control** | Batch node IDs and delay between export calls |

### Tool Sequence

```typescript
call_tool_chain({
  code: `
    const fileKey = "marketing_site_file_key";
    const exportFormat = "png";
    const scale = 2;

    const file = await figma.figma_get_file({
      fileKey,
      depth: 2
    });

    function collectFrames(node, results = []) {
      if (node.type === "FRAME" && /export|hero|card|thumbnail/i.test(node.name || "")) {
        results.push({
          id: node.id,
          name: node.name,
          type: node.type
        });
      }
      for (const child of node.children || []) {
        collectFrames(child, results);
      }
      return results;
    }

    const candidates = collectFrames(file.document).slice(0, 60);
    const batches = [];
    for (let i = 0; i < candidates.length; i += 10) {
      batches.push(candidates.slice(i, i + 10));
    }

    const manifest = [];
    for (const batch of batches) {
      const ids = batch.map(item => item.id);

      const nodes = await figma.figma_get_file_nodes({
        fileKey,
        node_ids: ids,
        depth: 1
      });

      const images = await figma.figma_get_image({
        fileKey,
        ids,
        format: exportFormat,
        scale
      });

      for (const item of batch) {
        manifest.push({
          nodeId: item.id,
          name: item.name,
          type: item.type,
          imageUrl: images.images[item.id],
          nodeFound: Boolean(nodes.nodes?.[item.id])
        });
      }

      await new Promise(resolve => setTimeout(resolve, 1500));
    }

    console.log("Exported", manifest.length, "images");
    return {
      file: file.name,
      format: exportFormat,
      scale,
      manifest
    };
  `,
  timeout: 120000
});
```

### Expected Output

| Output | Use |
|---|---|
| `manifest[].nodeId` | Stable reference for traceability during this run |
| `manifest[].name` | Human-readable asset name |
| `manifest[].imageUrl` | Temporary Figma image URL for ingestion |
| `manifest[].nodeFound` | Verification that export targets matched node fetch |

### Common Pitfalls

| Pitfall | Fix |
|---|---|
| Huge payloads and irrelevant assets | Use naming filters and depth-limited traversal |
| Export fails after design edits | Re-run `figma_get_file` and rebuild the manifest |
| 429 rate limit or missing image URLs | Batch 10 IDs and delay between calls |
| Stored image URLs expire later | Ingest URLs immediately into the destination asset system |

---

## 5. DESIGN REVIEW AUTOMATION

### Comments → Summary Report

```yaml
workflow:
  intent: "Design review automation"
  sync_fit:
    Survey: "Get comments for the design file"
    Yield: "Cluster comments by status, author, page, or node"
    Navigate: "Identify unresolved or high-risk discussion threads"
    Create: "Create a concise review report or downstream issue list"

  required_tools:
    - "figma_get_comments"

  optional_tools:
    - "figma_get_file_nodes"
    - "figma_post_comment"
```

### Preconditions

| Requirement | Details |
|---|---|
| **File key** | File containing review comments |
| **Review policy** | Decide whether to include resolved comments |
| **Routing target** | Markdown report, ClickUp tasks, Notion page, or Figma reply |
| **Privacy** | Do not expose private commenter data outside approved systems |

### Tool Sequence

```typescript
call_tool_chain({
  code: `
    const fileKey = "review_file_key";

    const commentsResponse = await figma.figma_get_comments({ fileKey });
    const comments = commentsResponse.comments || commentsResponse || [];

    const openComments = comments.filter(comment =>
      !comment.resolved_at && !comment.is_resolved
    );

    const byAuthor = openComments.reduce((acc, comment) => {
      const author = comment.user?.handle || comment.user?.email || "unknown";
      acc[author] = acc[author] || [];
      acc[author].push(comment);
      return acc;
    }, {});

    const reportLines = [
      "# Figma Design Review",
      "",
      "- File key: " + fileKey,
      "- Total comments: " + comments.length,
      "- Open comments: " + openComments.length,
      "",
      "## Open Comment Summary",
      ""
    ];

    for (const [author, list] of Object.entries(byAuthor)) {
      reportLines.push("### " + author);
      for (const comment of list) {
        const node = comment.client_meta?.node_id || "file";
        const text = String(comment.message || "").replace(/\\s+/g, " ").trim();
        reportLines.push("- [" + node + "] " + text);
      }
      reportLines.push("");
    }

    const report = reportLines.join("\\n");
    console.log(report);

    return {
      totalComments: comments.length,
      openComments: openComments.length,
      authors: Object.keys(byAuthor),
      report
    };
  `
});
```

### Expected Output

| Output | Use |
|---|---|
| `totalComments` | Review volume |
| `openComments` | Work still requiring attention |
| `authors` | Stakeholders involved |
| `report` | Markdown summary for Notion, ClickUp, or release notes |

### Common Pitfalls

| Pitfall | Fix |
|---|---|
| Resolved discussions reappear as blockers | Filter `resolved_at` or provider-specific resolution fields |
| Feedback cannot be traced to an element | Preserve `client_meta.node_id` when available |
| Automated replies spam Figma | Post one summary comment per review cycle |
| Old archive feedback mixes with current QA | Filter by `created_at`, page, or review frame |

---

## 6. COMPONENT DOCUMENTATION

### Components → Markdown Table

```yaml
workflow:
  intent: "Component documentation"
  sync_fit:
    Survey: "List file components"
    Yield: "Normalize component names, keys, descriptions, and node IDs"
    Navigate: "Fetch component details for selected components"
    Create: "Create a markdown table for documentation or handoff"

  required_tools:
    - "figma_get_file_components"
    - "figma_get_component"
```

### Preconditions

| Requirement | Details |
|---|---|
| **File key** | Component source file |
| **Published components** | Components should have keys for `figma_get_component` |
| **Documentation target** | Markdown file, Notion page, or generated implementation packet |
| **Limit** | Fetch details for selected components to avoid unnecessary calls |

### Tool Sequence

```typescript
call_tool_chain({
  code: `
    const fileKey = "component_library_file_key";

    const fileComponents = await figma.figma_get_file_components({ fileKey });
    const componentList = Object.values(fileComponents.meta.components || {});
    const selected = componentList.slice(0, 25);

    const rows = [];
    for (const component of selected) {
      let details = null;
      if (component.key) {
        details = await figma.figma_get_component({ key: component.key });
        await new Promise(resolve => setTimeout(resolve, 500));
      }

      rows.push({
        name: component.name || details?.name || "Unnamed",
        key: component.key || "",
        nodeId: component.node_id || "",
        description: component.description || details?.description || "",
        updatedAt: details?.updated_at || details?.modified_at || ""
      });
    }

    const markdown = [
      "| Component | Key | Node ID | Description | Updated |",
      "|---|---|---|---|---|",
      ...rows.map(row =>
        "| " + row.name +
        " | `" + row.key + "`" +
        " | `" + row.nodeId + "`" +
        " | " + String(row.description).replace(/\\|/g, "\\\\|") +
        " | " + row.updatedAt + " |"
      )
    ].join("\\n");

    console.log(markdown);
    return {
      count: componentList.length,
      documented: rows.length,
      markdown
    };
  `,
  timeout: 90000
});
```

### Expected Output

| Output | Use |
|---|---|
| `count` | Total components in the source file |
| `documented` | Number of rows generated |
| `markdown` | Table ready for docs, Notion, or implementation handoff |

### Common Pitfalls

| Pitfall | Fix |
|---|---|
| Large libraries become slow or rate-limited | Fetch details only for selected rows or missing descriptions |
| Descriptions with pipes break columns | Escape pipe characters in table cells |
| `figma_get_component` fails with file key | Pass `component.key`, not `fileKey` |
| Component sets are absent from docs | Use `figma_get_team_component_sets` for variants |

---

## 7. TEAM LIBRARY INVENTORY

### Team Projects + Project Files + Team Components

```yaml
workflow:
  intent: "Team library inventory"
  sync_fit:
    Survey: "List team projects"
    Yield: "Summarize files and component counts"
    Navigate: "Inspect project files and library records"
    Create: "Create a team inventory table for governance"

  required_tools:
    - "figma_get_team_projects"
    - "figma_get_project_files"
    - "figma_get_team_components"
```

### Preconditions

| Requirement | Details |
|---|---|
| **Team ID** | Numeric Figma team ID |
| **Library access** | Account can access team projects and published components |
| **Pagination plan** | Use `cursor` for large teams |
| **Governance fields** | Decide which file metadata matters: name, key, project, thumbnail, branch data |

### Tool Sequence

```typescript
call_tool_chain({
  code: `
    const teamId = "figma_team_id";

    async function paginate(fetchPage) {
      const results = [];
      let cursor = undefined;
      do {
        const page = await fetchPage(cursor);
        const items = page.projects || page.files || page.meta?.components || page.components || [];
        results.push(...(Array.isArray(items) ? items : Object.values(items)));
        cursor = page.cursor || page.pagination?.next_page || page.next_page || undefined;
        if (cursor) await new Promise(resolve => setTimeout(resolve, 1000));
      } while (cursor);
      return results;
    }

    const projects = await paginate(cursor =>
      figma.figma_get_team_projects({
        team_id: teamId,
        page_size: 30,
        cursor
      })
    );

    const filesByProject = [];
    for (const project of projects.slice(0, 20)) {
      const files = await paginate(cursor =>
        figma.figma_get_project_files({
          project_id: project.id,
          page_size: 30,
          cursor,
          branch_data: true
        })
      );
      filesByProject.push({
        projectId: project.id,
        projectName: project.name,
        files
      });
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    const teamComponents = await paginate(cursor =>
      figma.figma_get_team_components({
        team_id: teamId,
        page_size: 30,
        cursor
      })
    );

    const inventory = {
      teamId,
      projectCount: projects.length,
      fileCount: filesByProject.reduce((sum, project) => sum + project.files.length, 0),
      teamComponentCount: teamComponents.length,
      projects: filesByProject.map(project => ({
        project: project.projectName,
        files: project.files.map(file => ({
          name: file.name,
          key: file.key,
          lastModified: file.last_modified || file.lastModified,
          thumbnail: file.thumbnail_url
        }))
      }))
    };

    console.log(JSON.stringify(inventory, null, 2));
    return inventory;
  `,
  timeout: 180000
});
```

### Expected Output

| Output | Use |
|---|---|
| `projectCount` | Team scope |
| `fileCount` | Inventory size |
| `teamComponentCount` | Published component footprint |
| `projects[].files[]` | Governance table source |

### Common Pitfalls

| Pitfall | Fix |
|---|---|
| Only the first page appears | Paginate team and project endpoints |
| Inventory run takes too long | Limit projects first, then deepen high-value projects |
| `figma_get_project_files` returns not found | Use `project.id`, not `file.key` |
| Branch files inflate inventory | Keep `branch_data` explicit and label branches |

---

## 8. CROSS-MCP INTEGRATION

### Figma → ClickUp Tasks

When component inventory should become implementation work:

```typescript
call_tool_chain({
  code: `
    const fileKey = "design_system_file_key";
    const listName = "Implementation Queue";

    const components = await figma.figma_get_file_components({ fileKey });
    const componentList = Object.values(components.meta.components || {});

    const tasks = await clickup.clickup_create_bulk_tasks({
      listName,
      tasks: componentList.slice(0, 10).map(component => ({
        name: "Implement Figma component: " + component.name,
        description: [
          "Source: Figma MCP Agent",
          "File: https://www.figma.com/file/" + fileKey,
          "Component key: " + component.key,
          "Node ID: " + component.node_id,
          "",
          "SYNC fit: Surveyed component library, yielded implementation queue, navigated to component node, create this task."
        ].join("\\n"),
        priority: 3,
        tags: ["figma", "design-system", "ui-component"]
      }))
    });

    console.log("Created", tasks.length, "ClickUp tasks from Figma components");
    return {
      componentsFound: componentList.length,
      tasksCreated: tasks.length,
      tasks
    };
  `,
  timeout: 60000
});
```

### Figma Exports → Webflow CMS

When design exports should become CMS-backed assets:

```typescript
call_tool_chain({
  code: `
    const fileKey = "marketing_file_key";
    const collectionId = "webflow_collection_id";
    const nodeIds = ["12:34", "56:78", "90:12"];

    const nodes = await figma.figma_get_file_nodes({ fileKey, node_ids: nodeIds, depth: 1 });
    const images = await figma.figma_get_image({ fileKey, ids: nodeIds, format: "png", scale: 2 });

    const createdItems = [];
    for (const nodeId of nodeIds) {
      const node = nodes.nodes?.[nodeId]?.document;
      const cmsItem = await webflow.webflow_create_collection_item({
        collection_id: collectionId,
        fields: {
          name: node?.name || "Figma Export " + nodeId,
          slug: String(node?.name || nodeId).toLowerCase().replace(/[^a-z0-9]+/g, "-"),
          "figma-node-id": nodeId,
          "figma-file-key": fileKey,
          "source-image-url": images.images[nodeId]
        }
      });
      createdItems.push(cmsItem);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    return {
      exported: nodeIds.length,
      webflowItems: createdItems.length,
      createdItems
    };
  `,
  timeout: 120000
});
```

### Figma Comments → Notion Review Page

When design review comments need durable documentation:

```typescript
call_tool_chain({
  code: `
    const fileKey = "review_file_key";
    const databaseId = "notion_database_id";

    const commentsResponse = await figma.figma_get_comments({ fileKey });
    const comments = commentsResponse.comments || commentsResponse || [];
    const openComments = comments.filter(comment => !comment.resolved_at && !comment.is_resolved);
    const bullets = openComments.slice(0, 25).map(comment => ({
      object: "block",
      type: "bulleted_list_item",
      bulleted_list_item: {
        rich_text: [{
          type: "text",
          text: { content: "[" + (comment.client_meta?.node_id || "file") + "] " + String(comment.message || "") }
        }]
      }
    }));

    const page = await notion.API_post_page({
      parent: { database_id: databaseId },
      properties: {
        Name: { title: [{ text: { content: "Figma review - " + fileKey } }] },
        Status: { select: { name: openComments.length ? "Open" : "Clear" } },
        Source: { select: { name: "Figma" } }
      },
      children: [
        {
          object: "block",
          type: "paragraph",
          paragraph: {
            rich_text: [{
              type: "text",
              text: { content: "Open comments: " + openComments.length + " / Total comments: " + comments.length }
            }]
          }
        },
        ...bullets
      ]
    });

    console.log("Created Notion review page:", page.id);
    return { pageId: page.id, totalComments: comments.length, openComments: openComments.length };
  `
});
```

### Figma Tokens → Code-Gen Handoff

When design tokens should feed implementation:

```typescript
call_tool_chain({
  code: `
    const fileKey = "design_system_file_key";

    const [file, styles, components] = await Promise.all([
      figma.figma_get_file({ fileKey, depth: 1 }),
      figma.figma_get_file_styles({ fileKey }),
      figma.figma_get_file_components({ fileKey })
    ]);

    const styleList = Object.values(styles.meta.styles || {});
    const componentList = Object.values(components.meta.components || {});

    const handoff = {
      source: {
        type: "figma",
        fileKey,
        fileName: file.name,
        url: "https://www.figma.com/file/" + fileKey
      },
      tokens: styleList.map(style => ({
        name: style.name,
        type: style.style_type,
        key: style.key,
        suggestedName: style.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
      })),
      components: componentList.slice(0, 50).map(component => ({
        name: component.name,
        key: component.key,
        nodeId: component.node_id
      })),
      instructions: [
        "Use style keys as stable traceability metadata.",
        "Generate CSS variables or theme tokens from style names.",
        "Use component node IDs to request additional visual context before coding."
      ]
    };

    console.log(JSON.stringify(handoff, null, 2));
    return handoff;
  `
});
```

---

## 9. ERROR RECOVERY PATTERNS

### Authentication Failure

| Symptom | Recovery |
|---|---|
| `403 Forbidden`, invalid token, or expired OAuth | Re-authenticate and confirm file access |
| Environment variable missing in Code Mode | Use `figma_FIGMA_API_KEY`, then restart the AI client |
| Repeated Framelink auth failure | Regenerate the Figma personal access token |

### Wrong Tool Name

| Symptom | Recovery |
|---|---|
| `Tool not found: figma.get_file` | Use `figma.figma_get_file` |
| `Tool not found: figma.figma.get_file` | Use underscore form: `figma.figma_get_image`, `figma.figma_get_comments` |

### Rate Limiting

| Symptom | Recovery |
|---|---|
| `429 Too Many Requests` | Wait, then retry with smaller batches |
| Image export returns partial URLs | Use groups of 10 node IDs with 1-2 second delays |
| Team inventory stops after first pages | Use `cursor` pagination and cache results within the run |

### File or Node Not Found

| Symptom | Recovery |
|---|---|
| `404 Not Found` | Verify the file key from the Figma URL and check permissions |
| Node missing from `figma_get_file_nodes` | Re-fetch the file and rebuild node IDs |
| Component exists but cannot be exported | Use `component.key` for `figma_get_component`, `node_id` for node and image tools |

---

## 10. ✅ BEST PRACTICES

### Operating Rules

```yaml
best_practices:
  start_broad_then_narrow: "Use figma_get_file depth 1-2, then figma_get_file_nodes for exact targets."
  persona: "Figma MCP Agent is native MCP: design data interpreter and cross-tool handoff creator, not designer or developer."
  metadata_before_exports: "Use components/styles/nodes before figma_get_image unless visual assets are required."
  batching: "Batch node reads and image exports in groups of 10 with 1-2 second delays."
  traceability: "Preserve fileKey, file URL, node_id, component key, style key, comment id, and run timestamp."
  sync_finish: "SYNC ends with Create: report, token JSON, asset manifest, task list, review page, or handoff packet."
```

---

## 11. DECISION GUIDE: FIGMA MCP TOOLS

### Scenario Matrix

| Scenario | Use | Why |
|----------|-----|-----|
| Read file pages and frames | `figma_get_file` | Gives navigable document structure |
| Read specific frames/components | `figma_get_file_nodes` | Avoids full-file payloads |
| Export PNG/JPG/SVG/PDF | `figma_get_image` | Renders node IDs as image URLs |
| Get embedded image fills | `figma_get_image_fills` | Finds image assets used inside the file |
| List file components | `figma_get_file_components` | Best first step for component docs |
| Inspect one component | `figma_get_component` | Uses component key for detailed metadata |
| List file styles | `figma_get_file_styles` | Best first step for token export |
| Inspect one style | `figma_get_style` | Uses style key for detailed metadata |
| Read design feedback | `figma_get_comments` | Builds review reports |
| Post review feedback | `figma_post_comment` | Creates a Figma comment or reply |
| List team projects | `figma_get_team_projects` | Starts team inventory |
| List project files | `figma_get_project_files` | Maps file inventory per project |
| List team components | `figma_get_team_components` | Audits published component library |

---

## 12. QUICK REFERENCE

### Workflow Decision Tree

```yaml
what_do_you_need:
  audit_design_system:
    primary: MCP
    tools: ["figma_get_file_components", "figma_get_file_styles", "figma_get_team_components"]
    creates: "Audit report and risk list"

  export_design_tokens:
    primary: MCP
    tools: ["figma_get_file_styles", "figma_get_style"]
    creates: "token.json mapping"

  bulk_image_export:
    primary: MCP
    tools: ["figma_get_file", "figma_get_file_nodes", "figma_get_image"]
    creates: "Export manifest with image URLs"

  design_review_automation:
    primary: MCP
    tools: ["figma_get_comments", "figma_post_comment"]
    creates: "Review report or summary reply"

  component_documentation:
    primary: MCP
    tools: ["figma_get_file_components", "figma_get_component"]
    creates: "Markdown component table"

  team_library_inventory:
    primary: MCP
    tools: ["figma_get_team_projects", "figma_get_project_files", "figma_get_team_components"]
    creates: "Team inventory table"

  cross_mcp_handoff:
    primary: MCP
    tools: ["Figma tools + ClickUp/Webflow/Notion/code-generation tools"]
    creates: "Tasks, CMS records, documentation pages, or handoff packets"
```

### Related Resources

Install and Source References: see the agent-level INSTALL_GUIDE.md; the original mcp-figma developer skill was retired, and this AI Systems agent supersedes it.
