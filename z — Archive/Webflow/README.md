# Webflow Agent - User Guide v0.530

Creates and manages Webflow sites through natural language using Designer and Data API integration with **transparent SYNC processing**.

---


## 1. WHAT'S NEW

### Latest Updates
- **Version Number Cleanup**: Removed version numbers from all internal document references for cleaner maintenance
- **Enhanced Readability**: Improved balance between YAML and markdown prose across all knowledge documents
- **MCP Knowledge Update**: Updated Webflow - MCP Knowledge with clearer technical specifications
- **Better Structure**: Converted heavily YAML-formatted sections to readable markdown while preserving technical accuracy

### Major Features
- **SYNC Framework**: Superior 4-phase methodology (Survey → Yield → Navigate → Create) with clearer phase naming
- **Streamlined Processing**: Consolidated validation + integration into final Create phase for efficiency
- **Enhanced Clarity**: More intuitive phase names that better describe actual operations

### Enhanced System Intelligence
- **Intelligent Context Assessment**: Extracts user intent from minimal information and suggests optimal native approaches
- **Native API Optimization**: Balance structure vs design automatically based on use case
- **Proactive Guidance**: Suggests improvements beyond immediate request
- **Reality Check**: Verifies MCP capabilities before promising features
- **Clean Interface**: No dividers rule - only bullets and headers for cleaner responses
- **Two-Layer Transparency**: Full cognitive rigor internally, concise progress updates externally
- **Smart API Coordination**: Automatic selection of optimal API strategy (Data first, Designer second, or parallel)

### Core Capabilities Remain
- Full Designer API integration for visual development
- Complete Data API for structure and content
- Create collections, fields, and relationships
- Build components and design systems
- Manage responsive layouts and SEO

---


## 2. KEY FEATURES

### Complete Development Capabilities

**Designer API Features:**
- Build elements using native Webflow Designer API
- Apply styles through API calls only
- Create reusable components natively
- Manage breakpoints via API
- Use Webflow's design tokens
- Real-time preview in Designer

**Data API Features:**
- Build complete data structures
- Add any field type to collections
- Create references between collections
- Full CRUD on items
- Manage draft/live states
- SEO optimization

**Important**: The system NEVER writes custom JavaScript, CSS, or HTML code. All operations use native Webflow APIs exclusively.

### System Features
- **Connection First**: Always verifies MCP connection
- **SYNC Processing**: Transparent 4-phase methodology
- **Interactive Mode**: Single comprehensive questions
- **Clear Feedback**: Visual progress for every operation

---


## 3. SYSTEM ARCHITECTURE

```
AGENTS.md → Entry point with intelligent routing logic
    ↓
MCP System - Webflow.md (System prompt with SYNC integration)
    ↓
SYNC Thinking Framework (4-phase methodology with cognitive rigor)
    ↓
Interactive Intelligence (Conversation flow with two-layer transparency)
    ↓
MCP Knowledge (Designer & Data API specifications)
    ↓
Output → Native Webflow operations via MCP server
```

---


## 4. QUICK SETUP

### Step 1: Create a Claude Project
1. Go to claude.ai
2. Click "Projects" in sidebar
3. Create new project named "Webflow Agent"

### Step 2: Add System Instructions
1. Click "Edit project details"
2. Find "Custom instructions" section
3. Copy and paste: `MCP System - Webflow.md`
4. Save the project

### Step 3: Upload Reference Documents
Add these documents to your project:
- `Webflow - MCP Knowledge.md`
- `Webflow - Interactive Intelligence.md`
- `Webflow - SYNC Thinking Framework.md`

### Step 4: Continue to MCP Installation
Follow the installation guide in the next section

### Step 5: Start Building!
```
Create complete blog with categories
Build hero component with animations
Design responsive navigation
Setup e-commerce catalog
```

---


## 5. INSTALLING WEBFLOW MCP

### Recommended: OAuth Remote Setup

**Config Location:**
- Mac/Linux: `~/.config/claude/claude_desktop_config.json`
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "webflow": {
      "command": "npx",
      "args": ["mcp-remote", "https://mcp.webflow.com/sse"]
    }
  }
}
```

After saving:
1. Restart Claude Desktop (Cmd/Ctrl + R)
2. Browser opens for OAuth authorization
3. Authorize the sites you want to access
4. MCP Bridge App auto-installs to authorized sites
5. System verifies connection automatically

### Alternative: Token-Based Setup
```json
{
  "mcpServers": {
    "webflow": {
      "command": "npx",
      "args": ["-y", "@webflow/mcp-server"],
      "env": {
        "WEBFLOW_TOKEN": "your-api-token-here"
      }
    }
  }
}
```

Get your token from [Webflow API Settings](https://webflow.com/dashboard/account/apps).

---


## 6. DESIGNER API SETUP

### Enabling Designer Operations

1. **Open Webflow Designer**
   - Navigate to your project
   - Open in Designer mode

2. **Launch MCP Bridge App**
   - Press 'E' to open Apps panel
   - Find "Webflow MCP Bridge App"
   - Click to launch
   - Keep open during session

3. **Verify Connection**
   - App shows "Connected" status
   - Agent confirms Designer access
   - Ready for native operations

### What Requires the App

**Needs App (Designer API):**
- Creating native elements
- Applying native styles
- Building native components
- Managing responsive design

**Works Without App (Data API):**
- Creating collections
- Adding fields
- Managing content
- Publishing items

---


## 7. CONNECTION VERIFICATION

### Automatic Connection Check

The system automatically verifies MCP connection before operations:

```markdown
 Webflow Connection Check

✔ MCP Server: Connected
✔ Data API: Ready
✔ Designer API: Ready (app required)
✔ Authentication: Valid
```

### Test Query Protocol
- Executes `webflow:sites_list()` to verify connection
- If successful: Proceeds with operations
- If failed: Provides setup guidance

---


## 8. HOW IT WORKS

### SYNC Processing Framework

The system uses intelligent 4-phase SYNC methodology:

```markdown
 SYNC Processing:

S - Survey: Understanding context and requirements
Y - Yield: Converting to optimal native approach
N - Navigate: Executing operations through native APIs
C - Create: Validating quality and delivering results

Internal: Full cognitive rigor (optimized workflow)
External: Concise progress updates only
```

### Native API Operations Only

```markdown
✅ CORRECT Approach:

• Uses webflow:components_create()
• Uses webflow:pages_update_static_content()
• Uses webflow:collections_items_create_item_live()
• All operations through MCP server

❌ NEVER Does This:

• Write custom JavaScript code
• Create CSS snippets
• Generate HTML templates
• Build code outside Webflow
```

### Execution Modes

The system provides intelligent execution:

```markdown
 Standard Mode:

• Default for all operations
• Full SYNC processing (4 phases)
• Best for complex tasks
• Shows concise progress updates
```

---


## 9. EXAMPLE INTERACTIONS

### Creating a Blog System
```
User: Create a blog system

System: 
 Webflow Connection Check

✔ MCP Server: Connected
✔ Data API: Ready

I'll create a complete blog system for you!

 SYNC Processing:

S - Survey: Blog system with scalable architecture
Y - Yield: Collections + relationships structure
N - Navigate: Posts → Authors → Categories
C - Create: Validating structure and delivering...

 Webflow Operation

Operation: Blog structure creation

 Processing:
├── Creating collections ✔
├── Adding fields ✔
└── Setting relationships ✔

Progress: [████████████████] 100%
API calls: 15/60 🟢

✅ Operation Complete!

 Results:
├── Collections: 3 created
├── Fields: 18 added
└── Relationships: 2 configured

 Reference fields link your content!
```

---


## 10. WHAT GETS CREATED

### Full Stack Example - Blog System

```javascript
// Data Structure (Created via Data API)
Collections: {
  BlogPosts: {
    fields: ['title', 'content', 'excerpt', 'featured_image',
             'author', 'categories', 'published_date']
  },
  Authors: {
    fields: ['name', 'bio', 'avatar']
  },
  Categories: {
    fields: ['name', 'slug', 'description']
  }
}

// Components (Created via Designer API)
Components: {
  BlogCard: 'Native Webflow component',
  AuthorBio: 'Native author block',
  CategoryFilter: 'Native filtering component'
}
```

---


## 11. VERSION HISTORY

### Latest Release
- **Version Number Cleanup**: Removed version numbers from all internal document references
- **Documentation Improvements**: Enhanced balance between YAML and markdown prose in all knowledge documents
- **MCP Knowledge Update**: Improved readability and structure
- **Better Technical Specs**: Clearer presentation of API specifications while maintaining accuracy
- **Maintained All Capabilities**: No functional changes, only documentation clarity improvements

### Previous Release
- **SYNC Framework**: Transitioned from ATLAS (5 phases) to SYNC (4 phases) for improved clarity
- **Better Phase Naming**: Survey, Yield, Navigate, Create more intuitive than Assess, Transform, Layer, Apply, Synthesize
- **Streamlined Processing**: Combined validation + integration into final Create phase
- **Updated Knowledge Base**: All documents aligned with SYNC methodology
- **Maintained Intelligence**: All cognitive rigor and two-layer transparency preserved
- **Same Capabilities**: All Webflow operations and features unchanged

### Earlier Release
- Introduced transparent processing framework (4-phase methodology)
- Enhanced MCP integration with mandatory connection verification
- Improved intelligent context assessment and solution finding
- Added two-layer transparency model (internal rigor + concise updates)
- Streamlined conversation architecture with comprehensive questions
- Updated all knowledge base files to latest versions
- Removed deprecated pattern learning system
- Enhanced native API coordination and optimization

### Earlier Releases
- Simplified architecture removing complex thinking mechanisms
- Streamlined execution flow
- Cleaner codebase with direct operations
- Maintained all core Webflow capabilities
- Introduced automatic processing systems
- Enhanced connection verification
- Improved error handling
- Initial MCP integration
- Designer and Data API support
- Basic command structure

---


## 12. RESOURCES

### Essential Links
- [Webflow MCP Server](https://github.com/webflow/mcp-server)
- [Designer API Docs](https://developers.webflow.com/designer/reference)
- [Data API Docs](https://developers.webflow.com/data/reference)
- [MCP Protocol](https://modelcontextprotocol.io/)

### Quick References
- [Get API Token](https://webflow.com/dashboard/account/apps)
- [Webflow Designer](https://webflow.com/designer)
- [Claude Desktop](https://claude.ai/download)
- [Cloudinary](https://cloudinary.com/) - Image hosting

