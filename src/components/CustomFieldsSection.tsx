import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface CustomField {
  id: string;
  label: string;
  type: "text" | "number" | "date" | "select" | "textarea";
  required: boolean;
  options?: string[];
}

interface CustomFieldsSectionProps {
  fields: CustomField[];
  onChange?: (fields: CustomField[]) => void;
  onFieldsChange?: (fields: CustomField[]) => void;
}

function getOnChange(props: CustomFieldsSectionProps) {
  return props.onChange || props.onFieldsChange || (() => {});
}

const CustomFieldsSection = (props: CustomFieldsSectionProps) => {
  const { fields } = props;
  const handleChange = getOnChange(props);

  const addField = () => {
    const newField: CustomField = {
      id: `cf-${Date.now()}`,
      label: "",
      type: "text",
      required: false,
    };
    handleChange([...fields, newField]);
  };

  const updateField = (index: number, patch: Partial<CustomField>) => {
    const updated = fields.map((f, i) => (i === index ? { ...f, ...patch } : f));
    handleChange(updated);
  };

  const removeField = (index: number) => {
    handleChange(fields.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium">Custom Fields</Label>
        <Button type="button" variant="outline" size="sm" onClick={addField} className="gap-1">
          <Plus className="h-3 w-3" />
          Add Field
        </Button>
      </div>
      {fields.map((field, idx) => (
        <div key={field.id} className="flex items-end gap-2 p-3 border rounded-lg bg-muted/30">
          <div className="flex-1 space-y-1">
            <Label className="text-xs">Label</Label>
            <Input
              value={field.label}
              onChange={(e) => updateField(idx, { label: e.target.value })}
              placeholder="Field label"
              className="h-8"
            />
          </div>
          <div className="w-32 space-y-1">
            <Label className="text-xs">Type</Label>
            <Select value={field.type} onValueChange={(v) => updateField(idx, { type: v as CustomField["type"] })}>
              <SelectTrigger className="h-8 bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                <SelectItem value="text">Text</SelectItem>
                <SelectItem value="number">Number</SelectItem>
                <SelectItem value="date">Date</SelectItem>
                <SelectItem value="select">Select</SelectItem>
                <SelectItem value="textarea">Textarea</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="button" variant="ghost" size="icon" className="h-8 w-8" onClick={() => removeField(idx)}>
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </div>
      ))}
      {fields.length === 0 && (
        <p className="text-sm text-muted-foreground text-center py-4">No custom fields added</p>
      )}
    </div>
  );
};

export default CustomFieldsSection;
