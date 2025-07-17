const mongoose = require("mongoose");
const ProjectSchema = new mongoose.Schema({
  project_name: { type: String, required: true },
  project_description: { type: String, required: true },
  project_tech: { type: String, required: true },
  project_status: { type: String, required: true },
  project_startDate: { type: String, required: true },
  project_deadlineDate: { type: String, required: true },
  project_lead: { type: String, required: true },
  project_manager: { type: String, required: true },
  project_client: { type: String, required: true },
  management_tool: { type: String, required: true },
  management_url: { type: String, required: true },
  repo_tool: { type: String, required: true },
  repo_url: { type: String, required: true },
  project_budget: { type: Number, required: true },
  project_milestone_release_date: { type: String, required: true },
  project_priority: { type: String, required: true },
  project_location: { type: String, required: true },
  project_type: { type: [String], required: true },
  project_approval_status: { type: String, required: true },
  project_user_id: { type: String },
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Project", ProjectSchema, "em_projects");
