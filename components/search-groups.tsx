import React from 'react'
import { Button } from "@/components/ui/button"
import { searchGroups, type SearchGroup } from '@/lib/utils'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/app/providers'

interface SearchGroupsProps {
  selectedGroup: string
  onGroupSelect: (group: string) => void
}

export function SearchGroups({ selectedGroup, onGroupSelect }: SearchGroupsProps) {
  const { language, t } = useLanguage();
  
  // تحسين مظهر أزرار البحث
  return (
    <div className="flex flex-wrap justify-center gap-1.5">
      {searchGroups.filter(group => group.show).map((group) => {
        const Icon = group.icon
        const isSelected = selectedGroup === group.id
        
        // استخدام اسم المجموعة المترجم من ملف الترجمات الرئيسي
        const groupName = t(`searchGroups.${group.id}`);
        
        return (
          <Button
            key={group.id}
            variant={isSelected ? "default" : "ghost"}
            className={cn(
              "relative flex items-center h-8 px-2.5 py-1 text-xs rounded-full",
              isSelected 
                ? "bg-primary text-primary-foreground shadow-sm" 
                : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800",
              "transition-all duration-200"
            )}
            onClick={() => onGroupSelect(group.id)}
            size="sm"
          >
            <Icon className="w-3.5 h-3.5 mr-1.5" />
            <span>{groupName}</span>
          </Button>
        )
      })}
    </div>
  )
}