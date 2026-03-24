# 安全说明

## 环境变量保护

本项目使用环境变量来保护敏感信息（如 API 密钥）。

### 重要文件

- `.env.local` - 包含真实的 API 密钥（已在 .gitignore 中，不会提交到 Git）
- `.env.example` - 示例配置文件（可以安全地提交到 Git）

### 设置步骤

1. 复制 `.env.example` 为 `.env.local`：
   ```bash
   cp .env.example .env.local
   ```

2. 在 `.env.local` 中填入你的真实 API 密钥

3. 确保 `.env.local` 永远不要提交到 Git 仓库

### 检查清单

- ✅ `.env.local` 已在 `.gitignore` 中
- ✅ 脚本文件使用环境变量而非硬编码密钥
- ✅ 提供了 `.env.example` 作为配置模板
- ✅ 所有敏感信息都通过环境变量管理

### 如果不小心提交了密钥

如果你不小心将 API 密钥提交到了 Git：

1. 立即在 Pexels 网站上撤销该密钥
2. 生成新的 API 密钥
3. 更新 `.env.local` 文件
4. 使用 `git filter-branch` 或 BFG Repo-Cleaner 从 Git 历史中删除敏感信息
