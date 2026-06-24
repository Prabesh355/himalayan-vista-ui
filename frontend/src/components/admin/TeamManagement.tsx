import React, { useEffect, useMemo, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { DataTable } from "./DataTable";
import { Edit, Plus, Trash2, Upload } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { adminService, TeamItem } from "@/services/adminService";
import { teamMembers } from "@/services/uiData";
import { toast } from "sonner";

type TeamFormState = {
  name: string;
  role: string;
  bio: string;
  avatar: string;
  sortOrder: string;
  isActive: boolean;
};

const emptyForm: TeamFormState = {
  name: "",
  role: "",
  bio: "",
  avatar: "",
  sortOrder: "0",
  isActive: true,
};

function mapMemberToForm(member: TeamItem): TeamFormState {
  return {
    name: member.name || "",
    role: member.role || "",
    bio: member.bio || "",
    avatar: member.avatar || "",
    sortOrder: String(member.sortOrder ?? 0),
    isActive: Boolean(member.isActive ?? true),
  };
}

export const TeamManagement: React.FC = () => {
  const queryClient = useQueryClient();
  const avatarInputRef = useRef<HTMLInputElement | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamItem | null>(null);
  const [form, setForm] = useState<TeamFormState>(emptyForm);
  const [uploading, setUploading] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-team-members"],
    queryFn: () => adminService.getTeamMembers(),
  });

  useEffect(() => {
    if (error) toast.error(error.message || "Failed to load team members");
  }, [error]);

  const saveMutation = useMutation({
    mutationFn: async () => {
      const payload = {
        name: form.name,
        role: form.role,
        bio: form.bio,
        avatar: form.avatar,
        sortOrder: Number(form.sortOrder || 0),
        isActive: form.isActive,
      };

      return selectedMember?._id
        ? adminService.updateTeamMember(selectedMember._id, payload)
        : adminService.createTeamMember(payload);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["admin-team-members"] });
      await queryClient.invalidateQueries({ queryKey: ["team-members", "public"] });
      setIsModalOpen(false);
      setSelectedMember(null);
      setForm(emptyForm);
      toast.success("Team member saved successfully");
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || err?.message || "Save failed");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (memberId: string) => adminService.deleteTeamMember(memberId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["admin-team-members"] });
      await queryClient.invalidateQueries({ queryKey: ["team-members", "public"] });
      toast.success("Team member deleted");
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || err?.message || "Delete failed");
    },
  });

  const [deletedFallbackIds, setDeletedFallbackIds] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      const saved = window.localStorage.getItem("deleted_fallback_team_members");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const members = useMemo(() => {
    const dbMembers = data?.data || [];
    const dbNames = new Set(dbMembers.map((m) => (m.name || "").toLowerCase().trim()));

    const remainingFallbacks = teamMembers.filter((tf) => {
      const nameKey = (tf.name || "").toLowerCase().trim();
      const isSavedInDb = dbNames.has(nameKey);
      const isDeleted = deletedFallbackIds.includes(tf.id || "");
      return !isSavedInDb && !isDeleted;
    });

    return [...dbMembers, ...remainingFallbacks];
  }, [data?.data, deletedFallbackIds]);

  const isShowingFallback = useMemo(() => {
    if (isLoading) return false;
    const dbMembers = data?.data || [];
    const dbNames = new Set(dbMembers.map((m) => (m.name || "").toLowerCase().trim()));
    return teamMembers.some((tf) => {
      const nameKey = (tf.name || "").toLowerCase().trim();
      return !dbNames.has(nameKey) && !deletedFallbackIds.includes(tf.id || "");
    });
  }, [data?.data, deletedFallbackIds, isLoading]);

  const filteredMembers = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return members.filter(
      (member) =>
        member.name.toLowerCase().includes(term) || member.role.toLowerCase().includes(term),
    );
  }, [members, searchTerm]);

  const columns = [
    { key: "name", header: "Name" },
    { key: "role", header: "Role" },
    {
      key: "sortOrder",
      header: "Order",
      render: (item: any) => String(item.sortOrder ?? 0),
    },
    {
      key: "status",
      header: "Status",
      render: (item: any) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${item.isActive !== false ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}
        >
          {item.isActive !== false ? "Active" : "Inactive"}
        </span>
      ),
    },
  ];

  const openForm = (member?: TeamItem) => {
    if (member) {
      setSelectedMember(member);
      setForm(mapMemberToForm(member));
    } else {
      setSelectedMember(null);
      setForm(emptyForm);
    }
    setIsModalOpen(true);
  };

  const handleAvatarUpload = async (files: FileList | null) => {
    const file = files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await adminService.uploadImage(fd);
      if (res?.fileUrl) {
        setForm((prev) => ({ ...prev, avatar: res.fileUrl }));
        toast.success("Avatar uploaded");
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || err?.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const actions = (item: any) => {
    const isFallback = !item._id;
    return (
      <div className="flex items-center justify-end gap-2 text-muted-foreground">
        <button
          className="p-1 hover:text-primary transition-colors disabled:cursor-not-allowed disabled:opacity-50"
          onClick={() => openForm(item)}
          title={isFallback ? "Edit fallback member (will save to database)" : "Edit member"}
        >
          <Edit className="w-4 h-4" />
        </button>
        <button
          className="p-1 hover:text-red-500 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
          onClick={() => {
            if (isFallback) {
              const nextDeleted = [...deletedFallbackIds, item.id || ""];
              setDeletedFallbackIds(nextDeleted);
              if (typeof window !== "undefined") {
                window.localStorage.setItem(
                  "deleted_fallback_team_members",
                  JSON.stringify(nextDeleted)
                );
              }
              toast.success("Team member deleted");
            } else {
              deleteMutation.mutate(item._id || item.id || "");
            }
          }}
          title={isFallback ? "Delete fallback member" : "Delete member"}
        >
          <Trash2 className="w-4 h-4" />
        </button>
        {isFallback ? (
          <span className="text-xs text-amber-700 whitespace-nowrap">Fallback data</span>
        ) : null}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Team</h1>
          <p className="text-muted-foreground">
            Manage the guides and leaders shown on the Team page.
          </p>
        </div>
        <Dialog
          open={isModalOpen}
          onOpenChange={(open) => {
            setIsModalOpen(open);
            if (!open) {
              setSelectedMember(null);
              setForm(emptyForm);
            }
          }}
        >
          <DialogTrigger asChild>
            <button
              onClick={() => openForm()}
              className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              <Plus className="w-4 h-4" />
              New Member
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[720px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {selectedMember ? "Edit Team Member" : "Create New Team Member"}
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium">Name</label>
                <input
                  value={form.name}
                  onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Role</label>
                  <input
                    value={form.role}
                    onChange={(e) => setForm((prev) => ({ ...prev, role: e.target.value }))}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Sort Order</label>
                  <input
                    type="number"
                    value={form.sortOrder}
                    onChange={(e) => setForm((prev) => ({ ...prev, sortOrder: e.target.value }))}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">Bio</label>
                <textarea
                  value={form.bio}
                  onChange={(e) => setForm((prev) => ({ ...prev, bio: e.target.value }))}
                  className="min-h-32 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">Avatar</label>
                {form.avatar ? (
                  <div className="mb-2 overflow-hidden rounded-xl border border-border">
                    <img
                      src={form.avatar}
                      alt={form.name || "Avatar"}
                      className="h-48 w-full object-cover"
                    />
                  </div>
                ) : null}
                {form.avatar ? (
                  <div className="mb-3 flex items-center gap-3 rounded-xl border border-input bg-background p-3">
                    <div className="h-20 w-20 overflow-hidden rounded-lg border border-border bg-slate-50">
                      <img
                        src={form.avatar}
                        alt={form.name || "Avatar preview"}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="space-y-1 text-sm">
                      <p className="font-medium">Inline avatar preview</p>
                      <p className="text-muted-foreground">
                        This avatar will show on the team page. Upload or paste a new URL to replace it.
                      </p>
                    </div>
                  </div>
                ) : null}
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => avatarInputRef.current?.click()}
                    className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm hover:bg-secondary"
                    disabled={uploading}
                  >
                    <Upload className="h-4 w-4" />
                    {uploading ? "Uploading…" : "Upload from device"}
                  </button>
                  <input
                    ref={avatarInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      void handleAvatarUpload(e.target.files);
                      e.currentTarget.value = "";
                    }}
                  />
                  <input
                    value={form.avatar}
                    onChange={(e) => setForm((prev) => ({ ...prev, avatar: e.target.value }))}
                    placeholder="Or paste image URL"
                    className="flex-1 min-w-[260px] h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                  />
                  {form.avatar ? (
                    <button
                      type="button"
                      onClick={() => setForm((prev) => ({ ...prev, avatar: "" }))}
                      className="inline-flex items-center rounded-md border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700 hover:bg-red-100"
                    >
                      Remove
                    </button>
                  ) : null}
                </div>
              </div>
              <label className="inline-flex items-center gap-2 text-sm font-medium">
                <input
                  type="checkbox"
                  checked={form.isActive}
                  onChange={(e) => setForm((prev) => ({ ...prev, isActive: e.target.checked }))}
                />
                Active
              </label>
              <button
                onClick={() => saveMutation.mutate()}
                className="mt-4 bg-primary text-primary-foreground h-10 rounded-md font-medium disabled:opacity-50"
                disabled={saveMutation.isPending}
              >
                {saveMutation.isPending ? "Saving…" : selectedMember ? "Update Member" : "Save Member"}
              </button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {error && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-red-700">
          Unable to load team members: {error instanceof Error ? error.message : "Please try again."}
        </div>
      )}
      {isShowingFallback && (
        <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/10 p-4 text-yellow-900">
          Showing fallback team members while admin team data is unavailable.
        </div>
      )}

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <DataTable
          data={filteredMembers as any[]}
          columns={columns}
          keyExtractor={(item: any) => item._id || item.id || item.name}
          onSearch={setSearchTerm}
          searchPlaceholder="Search team members..."
          actions={actions}
          isLoading={isLoading}
        />
      </motion.div>
    </div>
  );
};