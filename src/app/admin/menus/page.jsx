"use client";

import { useMemo, useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { MENU_TREE } from "@/lib/admin/mockData";
import AccessGate from "@/components/admin/AccessGate";
import styles from "./menus.module.css";

const audiences = [
  { value: "public", label: "Genel" },
  { value: "members", label: "Üyeler" },
  { value: "vip", label: "VIP" },
];

const generateId = () => `menu-${Math.random().toString(36).slice(2, 9)}`;

const findItem = (items, id) => {
  for (const item of items) {
    if (item.id === id) return item;
    if (item.children?.length) {
      const match = findItem(item.children, id);
      if (match) return match;
    }
  }
  return null;
};

const updateItem = (items, id, updater) =>
  items.map((item) => {
    if (item.id === id) {
      return updater(item);
    }
    if (item.children?.length) {
      return { ...item, children: updateItem(item.children, id, updater) };
    }
    return item;
  });

const addChild = (items, id, newItem) =>
  items.map((item) => {
    if (item.id === id) {
      const children = Array.isArray(item.children) ? item.children : [];
      return { ...item, children: [...children, newItem] };
    }
    if (item.children?.length) {
      return { ...item, children: addChild(item.children, id, newItem) };
    }
    return item;
  });

const removeItem = (items, id) =>
  items
    .filter((item) => item.id !== id)
    .map((item) => ({
      ...item,
      children: item.children?.length ? removeItem(item.children, id) : [],
    }));

const reorderArray = (arr, id, direction) => {
  const index = arr.findIndex((item) => item.id === id);
  if (index < 0) return null;
  const swapWith = direction === "up" ? index - 1 : index + 1;
  if (swapWith < 0 || swapWith >= arr.length) return null;
  const next = [...arr];
  const [removed] = next.splice(index, 1);
  next.splice(swapWith, 0, removed);
  return next;
};

const moveItem = (items, id, parentId, direction) => {
  if (!parentId) {
    const reordered = reorderArray(items, id, direction);
    return reordered ? reordered : items;
  }

  return items.map((item) => {
    if (item.id === parentId) {
      const reordered = reorderArray(item.children, id, direction);
      if (!reordered) return item;
      return { ...item, children: reordered };
    }
    if (item.children?.length) {
      return { ...item, children: moveItem(item.children, id, parentId, direction) };
    }
    return item;
  });
};

const findFirstId = (items) => {
  if (!items.length) return null;
  return items[0].id;
};

const MenuEditorPage = () => {
  const [menuItems, setMenuItems] = useState(MENU_TREE);
  const [selectedId, setSelectedId] = useState(findFirstId(MENU_TREE));

  const selectedItem = useMemo(() => findItem(menuItems, selectedId), [menuItems, selectedId]);

  const handleFieldChange = (field) => (event) => {
    const value = event.target.value;
    setMenuItems((prev) => updateItem(prev, selectedId, (item) => ({ ...item, [field]: value })));
  };

  const handleAddChild = (id) => {
    const newItem = {
      id: generateId(),
      label: "Yeni bağlantı",
      href: "/",
      audience: "public",
      children: [],
    };
    setMenuItems((prev) => addChild(prev, id, newItem));
    setSelectedId(newItem.id);
  };

  const handleAddRoot = () => {
    const newItem = {
      id: generateId(),
      label: "Yeni menü",
      href: "/",
      audience: "public",
      children: [],
    };
    setMenuItems((prev) => [...prev, newItem]);
    setSelectedId(newItem.id);
  };

  const handleDelete = (id) => {
    setMenuItems((prev) => {
      const result = removeItem(prev, id);
      if (selectedId === id) {
        setSelectedId(findFirstId(result));
      }
      return result;
    });
  };

  const handleMove = (id, parentId, direction) => {
    setMenuItems((prev) => moveItem(prev, id, parentId, direction));
  };

  return (
    <AccessGate permission="menus.manage" fallback={<p>Menü düzenleme izniniz yok.</p>}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div>
            <h1>Menü Düzenleyici</h1>
            <p>Hedef kitle bazlı gezinme yapısını JSON şemasıyla birlikte yönetin.</p>
          </div>
          <Button variant="primary" tone="solid" onClick={handleAddRoot}>
            Yeni kök menü ekle
          </Button>
        </header>

        <section className={styles.layout}>
          <Card variant="elevated" className={styles.treePanel} title="Menü yapısı">
            <ul className={styles.treeList}>
              {menuItems.map((item, index) => (
                <MenuTreeItem
                  key={item.id}
                  item={item}
                  depth={0}
                  selectedId={selectedId}
                  onSelect={setSelectedId}
                  onAddChild={handleAddChild}
                  onDelete={handleDelete}
                  onMove={handleMove}
                  index={index}
                  siblingsLength={menuItems.length}
                  parentId={null}
                />
              ))}
            </ul>
          </Card>

          <Card variant="elevated" className={styles.formPanel} title="Menü detayları">
            {selectedItem ? (
              <div className={styles.formFields}>
                <Input
                  label="Bağlantı etiketi"
                  value={selectedItem.label}
                  onChange={handleFieldChange("label")}
                />
                <Input
                  label="URL"
                  value={selectedItem.href}
                  onChange={handleFieldChange("href")}
                />
                <label className={styles.selectLabel}>
                  <span>Hedef kitle</span>
                  <select value={selectedItem.audience} onChange={handleFieldChange("audience")}> 
                    {audiences.map((audience) => (
                      <option key={audience.value} value={audience.value}>
                        {audience.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            ) : (
              <p>Bir menü öğesi seçin.</p>
            )}
          </Card>

          <Card variant="outlined" className={styles.previewPanel} title="JSON önizleme">
            <pre>{JSON.stringify(menuItems, null, 2)}</pre>
          </Card>
        </section>
      </div>
    </AccessGate>
  );
};

const MenuTreeItem = ({
  item,
  depth,
  selectedId,
  onSelect,
  onAddChild,
  onDelete,
  onMove,
  index,
  siblingsLength,
  parentId,
}) => {
  const isActive = item.id === selectedId;

  return (
    <li className={styles.treeItem}>
      <div
        className={`${styles.treeRow} ${isActive ? styles.treeRowActive : ""}`}
        style={{ paddingLeft: `${depth * 16}px` }}
      >
        <button type="button" className={styles.treeSelect} onClick={() => onSelect(item.id)}>
          {item.label}
        </button>
        <Badge variant="muted">{item.audience}</Badge>
        <div className={styles.treeActions}>
          <Button size="sm" variant="neutral" tone="ghost" onClick={() => onAddChild(item.id)}>
            Alt menü
          </Button>
          <Button
            size="sm"
            variant="neutral"
            tone="ghost"
            onClick={() => onMove(item.id, parentId, "up")}
            disabled={index === 0}
          >
            Yukarı
          </Button>
          <Button
            size="sm"
            variant="neutral"
            tone="ghost"
            onClick={() => onMove(item.id, parentId, "down")}
            disabled={index === siblingsLength - 1}
          >
            Aşağı
          </Button>
          <Button size="sm" variant="neutral" tone="outline" onClick={() => onDelete(item.id)}>
            Sil
          </Button>
        </div>
      </div>
      {item.children?.length ? (
        <ul className={styles.treeList}>
          {item.children.map((child, childIndex) => (
            <MenuTreeItem
              key={child.id}
              item={child}
              depth={depth + 1}
              selectedId={selectedId}
              onSelect={onSelect}
              onAddChild={onAddChild}
              onDelete={onDelete}
              onMove={onMove}
              index={childIndex}
              siblingsLength={item.children.length}
              parentId={item.id}
            />
          ))}
        </ul>
      ) : null}
    </li>
  );
};

export default MenuEditorPage;
