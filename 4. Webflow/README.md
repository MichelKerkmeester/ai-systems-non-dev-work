<!-- ANCHOR:webflow-agent-user-guide-v0-530 -->
# Webflow Agent - User Guide v0.530

Creates and manages Webflow sites through natural language using Designer and Data API integration with **transparent SYNC processing**.

<!-- /ANCHOR:webflow-agent-user-guide-v0-530 -->
<!-- ANCHOR:table-of-contents -->
## TABLE OF CONTENTS

  - 1. 🆕 WHAT'S NEW
  - 2. ✨ KEY FEATURES
  - 3. 🌳 SYSTEM ARCHITECTURE
  - 4. 🚀 QUICK SETUP
  - 5. 🔧 INSTALLING WEBFLOW MCP
  - 6. 🎨 DESIGNER API SETUP
  - 7. 🔌 CONNECTION VERIFICATION
  - 8. 🧠 HOW IT WORKS
  - 9. 💬 EXAMPLE INTERACTIONS
  - 10. 📊 WHAT GETS CREATED
  - 11. 📦 VERSION HISTORY
  - 12. 📚 RESOURCES

---


<!-- /ANCHOR:table-of-contents -->
<!-- ANCHOR:1-what-s-new -->
## 1. 🆕 WHAT'S NEW

<!-- /ANCHOR:1-what-s-new -->
<!-- ANCHOR:latest-updates -->
### Latest Updates
- **Version Number Cleanup**: Removed version numbers from all internal document references for cleaner maintenance
- **Enhanced Readability**: Improved balance between YAML and markdown prose across all knowledge documents
- **MCP Knowledge Update**: Updated Webflow - MCP Knowledge with clearer technical specifications
- **Better Structure**: Converted heavily YAML-formatted sections to readable markdown while preserving technical accuracy

<!-- /ANCHOR:latest-updates -->
<!-- ANCHOR:major-features -->
### Major Features
- **SYNC Framework**: Superior 4-phase methodology (Survey → Yield → Navigate → Create) with clearer phase naming
- **Streamlined Processing**: Consolidated validation + integration into final Create phase for efficiency
- **Enhanced Clarity**: More intuitive phase names that better describe actual operations

<!-- /ANCHOR:major-features -->
<!-- ANCHOR:enhanced-system-intelligence -->
### Enhanced System Intelligence
- **Intelligent Context Assessment**: Extracts user intent from minimal information and suggests optimal native approaches
- **Native API Optimization**: Balance structure vs design automatically based on use case
- **Proactive Guidance**: Suggests improvements beyond immediate request
- **Reality Check**: Verifies MCP capabilities before promising features
- **Clean Interface**: No dividers rule - only bullets and headers for cleaner responses
- **Two-Layer Transparency**: Full cognitive rigor internally, concise progress updates externally
- **Smart API Coordination**: Automatic selection of optimal API strategy (Data first, Designer second, or parallel)

<!-- /ANCHOR:enhanced-system-intelligence -->
<!-- ANCHOR:core-capabilities-remain -->
### Core Capabilities Remain
- Full Designer API integration for visual development
- Complete Data API for structure and content
- Create collections, fields, and relationships
- Build components and design systems
- Manage responsive layouts and SEO

---


<!-- /ANCHOR:core-capabilities-remain -->
<!-- ANCHOR:2-key-features -->
## 2. ✨ KEY FEATURES

<!-- /ANCHOR:2-key-features -->
<!-- ANCHOR:complete-development-capabilities -->
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

<!-- /ANCHOR:complete-development-capabilities -->
<!-- ANCHOR:system-features -->
### System Features
- **Connection First**: Always verifies MCP connection
- **SYNC Processing**: Transparent 4-phase methodology
- **Interactive Mode**: Single comprehensive questions
- **Clear Feedback**: Visual progress for every operation

---


<!-- /ANCHOR:system-features -->
<!-- ANCHOR:3-system-architecture -->
## 3. 🌳 SYSTEM ARCHITECTURE

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


<!-- /ANCHOR:3-system-architecture -->
<!-- ANCHOR:4-quick-setup -->
## 4. 🚀 QUICK SETUP

<!-- /ANCHOR:4-quick-setup -->
<!-- ANCHOR:step-1-create-a-claude-project -->
### Step 1: Create a Claude Project
1. Go to claude.ai
2. Click "Projects" in sidebar
3. Create new project named "Webflow Agent"

<!-- /ANCHOR:step-1-create-a-claude-project -->
<!-- ANCHOR:step-2-add-system-instructions -->
### Step 2: Add System Instructions
1. Click "Edit project details"
2. Find "Custom instructions" section
3. Copy and paste: `MCP System - Webflow.md`
4. Save the project

<!-- /ANCHOR:step-2-add-system-instructions -->
<!-- ANCHOR:step-3-upload-reference-documents -->
### Step 3: Upload Reference Documents
Add these documents to your project:
- `Webflow - MCP Knowledge.md`
- `Webflow - Interactive Intelligence.md`
- `Webflow - SYNC Thinking Framework.md`

<!-- /ANCHOR:step-3-upload-reference-documents -->
<!-- ANCHOR:step-4-continue-to-mcp-installation -->
### Step 4: Continue to MCP Installation
Follow the installation guide in the next section

<!-- /ANCHOR:step-4-continue-to-mcp-installation -->
<!-- ANCHOR:step-5-start-building -->
### Step 5: Start Building!
```
Create complete blog with categories
Build hero component with animations
Design responsive navigation
Setup e-commerce catalog
```

---


<!-- /ANCHOR:step-5-start-building -->
<!-- ANCHOR:5-installing-webflow-mcp -->
## 5. 🔧 INSTALLING WEBFLOW MCP

<!-- /ANCHOR:5-installing-webflow-mcp -->
<!-- ANCHOR:recommended-oauth-remote-setup -->
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

<!-- /ANCHOR:recommended-oauth-remote-setup -->
<!-- ANCHOR:alternative-token-based-setup -->
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


<!-- /ANCHOR:alternative-token-based-setup -->
<!-- ANCHOR:6-designer-api-setup -->
## 6. 🎨 DESIGNER API SETUP

<!-- /ANCHOR:6-designer-api-setup -->
<!-- ANCHOR:enabling-designer-operations -->
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

<!-- /ANCHOR:enabling-designer-operations -->
<!-- ANCHOR:what-requires-the-app -->
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


<!-- /ANCHOR:what-requires-the-app -->
<!-- ANCHOR:7-connection-verification -->
## 7. 🔌 CONNECTION VERIFICATION

<!-- /ANCHOR:7-connection-verification -->
<!-- ANCHOR:automatic-connection-check -->
### Automatic Connection Check

The system automatically verifies MCP connection before operations:

```markdown
🔧 Webflow Connection Check

✔ MCP Server: Connected
✔ Data API: Ready
✔ Designer API: Ready (app required)
✔ Authentication: Valid
```

<!-- /ANCHOR:automatic-connection-check -->
<!-- ANCHOR:test-query-protocol -->
### Test Query Protocol
- Executes `webflow:sites_list()` to verify connection
- If successful: Proceeds with operations
- If failed: Provides setup guidance

---


<!-- /ANCHOR:test-query-protocol -->
<!-- ANCHOR:8-how-it-works -->
## 8. 🧠 HOW IT WORKS

<!-- /ANCHOR:8-how-it-works -->
<!-- ANCHOR:sync-processing-framework -->
### SYNC Processing Framework

The system uses intelligent 4-phase SYNC methodology:

```markdown
📊 SYNC Processing:

S - Survey: Understanding context and requirements
Y - Yield: Converting to optimal native approach
N - Navigate: Executing operations through native APIs
C - Create: Validating quality and delivering results

Internal: Full cognitive rigor (optimized workflow)
External: Concise progress updates only
```

<!-- /ANCHOR:sync-processing-framework -->
<!-- ANCHOR:native-api-operations-only -->
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

<!-- /ANCHOR:native-api-operations-only -->
<!-- ANCHOR:execution-modes -->
### Execution Modes

The system provides intelligent execution:

```markdown
📊 Standard Mode:

• Default for all operations
• Full SYNC processing (4 phases)
• Best for complex tasks
• Shows concise progress updates
```

---


<!-- /ANCHOR:execution-modes -->
<!-- ANCHOR:9-example-interactions -->
## 9. 💬 EXAMPLE INTERACTIONS

<!-- /ANCHOR:9-example-interactions -->
<!-- ANCHOR:creating-a-blog-system -->
### Creating a Blog System
```
User: Create a blog system

System: 
🔧 Webflow Connection Check

✔ MCP Server: Connected
✔ Data API: Ready

I'll create a complete blog system for you!

📊 SYNC Processing:

S - Survey: Blog system with scalable architecture
Y - Yield: Collections + relationships structure
N - Navigate: Posts → Authors → Categories
C - Create: Validating structure and delivering...

🔧 Webflow Operation

Operation: Blog structure creation

📂 Processing:
├── Creating collections ✔
├── Adding fields ✔
└── Setting relationships ✔

Progress: [████████████████] 100%
API calls: 15/60 🟢

✅ Operation Complete!

📊 Results:
├── Collections: 3 created
├── Fields: 18 added
└── Relationships: 2 configured

💡 Reference fields link your content!
```

---


<!-- /ANCHOR:creating-a-blog-system -->
<!-- ANCHOR:10-what-gets-created -->
## 10. 📊 WHAT GETS CREATED

<!-- /ANCHOR:10-what-gets-created -->
<!-- ANCHOR:full-stack-example-blog-system -->
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


<!-- /ANCHOR:full-stack-example-blog-system -->
<!-- ANCHOR:11-version-history -->
## 11. 📦 VERSION HISTORY

<!-- /ANCHOR:11-version-history -->
<!-- ANCHOR:latest-release -->
### Latest Release
- **Version Number Cleanup**: Removed version numbers from all internal document references
- **Documentation Improvements**: Enhanced balance between YAML and markdown prose in all knowledge documents
- **MCP Knowledge Update**: Improved readability and structure
- **Better Technical Specs**: Clearer presentation of API specifications while maintaining accuracy
- **Maintained All Capabilities**: No functional changes, only documentation clarity improvements

<!-- /ANCHOR:latest-release -->
<!-- ANCHOR:previous-release -->
### Previous Release
- **SYNC Framework**: Transitioned from ATLAS (5 phases) to SYNC (4 phases) for improved clarity
- **Better Phase Naming**: Survey, Yield, Navigate, Create more intuitive than Assess, Transform, Layer, Apply, Synthesize
- **Streamlined Processing**: Combined validation + integration into final Create phase
- **Updated Knowledge Base**: All documents aligned with SYNC methodology
- **Maintained Intelligence**: All cognitive rigor and two-layer transparency preserved
- **Same Capabilities**: All Webflow operations and features unchanged

<!-- /ANCHOR:previous-release -->
<!-- ANCHOR:earlier-release -->
### Earlier Release
- Introduced transparent processing framework (4-phase methodology)
- Enhanced MCP integration with mandatory connection verification
- Improved intelligent context assessment and solution finding
- Added two-layer transparency model (internal rigor + concise updates)
- Streamlined conversation architecture with comprehensive questions
- Updated all knowledge base files to latest versions
- Removed deprecated pattern learning system
- Enhanced native API coordination and optimization

<!-- /ANCHOR:earlier-release -->
<!-- ANCHOR:earlier-releases -->
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


<!-- /ANCHOR:earlier-releases -->
<!-- ANCHOR:12-resources -->
## 12. 📚 RESOURCES

<!-- /ANCHOR:12-resources -->
<!-- ANCHOR:essential-links -->
### Essential Links
- [Webflow MCP Server](https://github.com/webflow/mcp-server)
- [Designer API Docs](https://developers.webflow.com/designer/reference)
- [Data API Docs](https://developers.webflow.com/data/reference)
- [MCP Protocol](https://modelcontextprotocol.io/)

<!-- /ANCHOR:essential-links -->
<!-- ANCHOR:quick-references -->
### Quick References
- [Get API Token](https://webflow.com/dashboard/account/apps)
- [Webflow Designer](https://webflow.com/designer)
- [Claude Desktop](https://claude.ai/download)
- [Cloudinary](https://cloudinary.com/) - Image hosting

<!-- /ANCHOR:quick-references -->
