"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { useParams } from "next/navigation";

const EditCategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>Ubah Kategori {slug}</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Tabs */}
          <Tabs defaultValue="detail" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger
                value="detail"
              >
                Detail
              </TabsTrigger>
              <TabsTrigger
                value="subcategory">
                Sub Kategori
              </TabsTrigger>
            </TabsList>

            {/* Tab Content */}
            <TabsContent value="detail">
              {/* Form */}
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="nama-kategori"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Nama Kategori
                  </label>
                  <Input
                    id="nama-kategori"
                    placeholder="Nama Kategori"
                    defaultValue="Finance Agreement"
                    className="mt-1"
                  />
                </div>
                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Description
                  </label>
                  <Textarea
                    id="description"
                    placeholder="Description"
                    defaultValue="Lorem ipsum dir dolor amet viet er dalum era"
                    className="mt-1"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="subcategory">
              {/* Sub Kategori Placeholder */}
              <p className="text-sm text-gray-500">Sub kategori content goes here...</p>
            </TabsContent>
          </Tabs>

          {/* Buttons */}
          <div className="mt-6 flex justify-end space-x-4">
            <Button variant="ghost">Kembali</Button>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">Simpan</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditCategoryPage;
